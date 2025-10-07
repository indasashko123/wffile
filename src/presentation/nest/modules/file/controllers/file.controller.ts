import { Controller, Post, UseInterceptors, UploadedFile, Body, UseGuards, Inject, Get, Param, Res, Req, ParseUUIDPipe } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "../../auth/guards";
import { ExtendRequest } from "../../../extends/extend.request";
import { Response } from "express";
import { FILE_CONSTANTS } from "../../constants";
import { IFileService } from "../../../../../core/application";
import { FilePath } from "../../../../../core/domain/file";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('files')
@Controller('files')
export class FileController {
  constructor(
    @Inject(FILE_CONSTANTS.FILE_SERVICE) 
    private readonly fileService: IFileService,
  ) {}


  @Post('upload')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'File to upload'
        },
      },
    },
  })
  @ApiResponse({ status: 201, type: String})
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: ExtendRequest,
  ): Promise<string> {
    const accountId = req.account.id;
    const fileData = {
      accountId,
      originalName: file.originalname,
      buffer: file.buffer,
      mimetype: file.mimetype,
      size: file.size
    };
    const savedFile = await this.fileService.saveFile(fileData);
    return savedFile.id;
  }

  @Get()
   @ApiBearerAuth('JWT-auth')
   @ApiResponse({ status: 200,  type: [String] })
  @UseGuards(AuthGuard)
  async getFiles(@Req() req: ExtendRequest): Promise<string[]> {
    const accountId = req.account.id;
    const filePaths = await this.fileService.getByAccount(accountId);
    return filePaths.map(fp=>fp.path);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id',  type: String, })
  async getFile(@Param('id', ParseUUIDPipe) id: string, @Req() req: ExtendRequest): Promise<FilePath> {
    const accountId = req.account.id;
    const file = await this.fileService.getById(id);    
    return file;
  }

  @Get('download/:fileId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'fileId', type: String, })
  @ApiResponse({ 
    status: 200, 
    description: 'File download',
    content: {
      'application/octet-stream': {
        schema: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  async downloadFile(
    @Param('fileId', ParseUUIDPipe) fileId: string,
    @Res() res: Response,
  ): Promise<void> {
    const file = await this.fileService.getFile(fileId);
    res.setHeader('Content-Type', file.filePath.mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${file.filePath.originalName}"`);
    file.stream.pipe(res);
  }
}
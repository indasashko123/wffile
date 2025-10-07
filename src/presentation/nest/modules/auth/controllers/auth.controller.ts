import { Body, Controller, Inject, Param, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AUTH_CONSTANTS } from "../../constants";
import { IAuthService } from "../../../../../core/application";
import { AuthResponse, RegistrationDto, TokenResponse } from "../dto";
import { LoginDto } from "../dto/login.dto";
import { ExtendRequest } from "../../../extends/extend.request";
import { Response } from "express";
import { AuthGuard } from "../guards";
import { ApiBearerAuth, ApiBody, ApiCookieAuth, ApiParam, ApiResponse, ApiTags,  } from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AUTH_CONSTANTS.AUTH_SERVICE) private readonly authService: IAuthService
    ) {
    }

    @ApiBody({ type: RegistrationDto })
    @ApiResponse({  status: 201,  type: AuthResponse})
    @Post('/registration')
    async registration(
        @Body() dto: RegistrationDto,
        @Res({ passthrough: true }) res: Response,
    ) : Promise<AuthResponse> {
        const authResponse = await this.authService.registration(dto);
        this.setRefreshTokenCookie(
            res, 
            authResponse.tokenResponse.refresh
        );
        return {
            accountResponse: authResponse.accountResponse,
            tokenResponse: {
                access: authResponse.tokenResponse.access
            }
        }
    }

    @ApiBody({ type: LoginDto })
    @ApiResponse({  status: 201,  type: AuthResponse})
    @Post('/login')
    async login (
        @Body() dto: LoginDto,
        @Res({ passthrough: true }) res: Response,    
    ): Promise<AuthResponse> {
        const authResponse = await this.authService.login(dto);
        this.setRefreshTokenCookie(
            res, 
            authResponse.tokenResponse.refresh
        );
        return {
            accountResponse: authResponse.accountResponse,
            tokenResponse: {
                access: authResponse.tokenResponse.access
            }
        }
    }

    
    @ApiCookieAuth('refresh')
    @ApiResponse({  status: 201,  type: TokenResponse})
    @Post('refresh')
    async refresh (
        @Req() req: ExtendRequest,
        @Res({ passthrough: true }) res: Response,
    ) : Promise<TokenResponse> {
        const token : string = req.cookies?.refresh;
        const tokenResponse = await this.authService.refresh(token);
        this.setRefreshTokenCookie(
            res, 
            tokenResponse.refresh
        );
        return {
            access: tokenResponse.access
        }
    }

    @ApiBearerAuth('JWT-auth')
    @ApiResponse({ 
        status: 201, 
        schema: {
            type: 'string',
            example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
        }
    })
    @Post('/entrance/create')
    @UseGuards(AuthGuard)
    async createEntranceToken(
        @Req() req: ExtendRequest,        
    ): Promise<string> {
        const accountId = req.account.id;
        const token = await this.authService.createEntranceToken (accountId);
        return token.id;
    }
        
    @ApiResponse({ status: 201, type: AuthResponse})
    @ApiParam({ 
        name: 'token', 
        type: 'string', 
        description: 'Entrance token UUID',
        example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
    })
    @Post('/entrance/:token')
    async entrance (
        @Param('token') token: string,
        @Res({passthrough: true}) res: Response
    ): Promise<AuthResponse> {
        const authResponse = await this.authService.loginWithEntranceToken(token);    
        this.setRefreshTokenCookie(res,authResponse.tokenResponse.refresh);
        return {
            accountResponse: authResponse.accountResponse,
            tokenResponse: {
                access: authResponse.tokenResponse.access
            }
        }
    }
        
    private setRefreshTokenCookie(response: Response, token: string): void {
    response.cookie('refresh', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/auth/refresh',
    });
  }
}


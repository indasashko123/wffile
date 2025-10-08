import { ApiProperty } from '@nestjs/swagger';

export class AccountResponse {
    @ApiProperty({ 
        example: 'john_doe',
        description: 'User login' 
    })
    login: string;
    @ApiProperty({ 
        description: 'User id' 
    })
    id: string;
}
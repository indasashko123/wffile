import { ApiProperty } from '@nestjs/swagger';

export class TokenResponse {
    @ApiProperty({ 
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: 'JWT access token' 
    })
    access: string;
}
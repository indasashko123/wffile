import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ 
        example: 'john_doe',
        description: 'User login (5-60 characters, letters, numbers, underscores)',
        minLength: 5,
        maxLength: 60
    })
    @IsString({ message: 'Login must be a string' })
    @MinLength(5, { message: 'Login must be at least 5 characters long' })
    @MaxLength(60, { message: 'Login cannot be longer than 60 characters' })
    login: string;

    @ApiProperty({ 
        example: 'Password123',
        description: 'User password (5-60 characters)',
        minLength: 5,
        maxLength: 60
    })
    @IsString({ message: 'Password must be a string' })
    @MinLength(5, { message: 'Password must be at least 5 characters long' })
    @MaxLength(60, { message: 'Password cannot be longer than 60 characters' })
    password: string;
}
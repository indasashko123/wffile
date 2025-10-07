import { IsString, MinLength, MaxLength, Matches, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegistrationDto {
    @ApiProperty({ 
        example: 'john_doe',
        description: 'User login (5-60 characters)',
        minLength: 5,
        maxLength: 60
    })
    @IsString({ message: 'Login must be a string' })
    @IsNotEmpty({ message: 'Login cannot be empty' })
    @MinLength(5, { message: 'Login must be at least 5 characters long' })
    @MaxLength(60, { message: 'Login cannot be longer than 60 characters' })
    login: string;

    @ApiProperty({ 
        example: 'SecurePassword123',
        description: 'User password (5-60 characters)',
        minLength: 5,
        maxLength: 60
    })
    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password cannot be empty' })
    @MinLength(5, { message: 'Password must be at least 5 characters long' })
    @MaxLength(60, { message: 'Password cannot be longer than 60 characters' })
    password: string;
}
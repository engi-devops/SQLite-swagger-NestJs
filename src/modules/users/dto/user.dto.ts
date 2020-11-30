import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export class UserDto {

    @IsNotEmpty()
    readonly userName : string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly image: string;

    @IsNotEmpty()
    readonly tags: string;
}

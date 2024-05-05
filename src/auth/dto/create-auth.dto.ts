import { ApiProperty, ApiResponse } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateAuthDto {
 
    @ApiProperty({
        description: 'username',
        type: String,
        example: 'users'
    })
    @IsString()
    username: string;

    @ApiProperty({
        description: 'password user',
        type: String,
        example: 'p@ssword'
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

}

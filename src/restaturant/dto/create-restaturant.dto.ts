import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsPhoneNumber, IsString, IsUrl, Max, Min } from "class-validator";

export class CreateRestaturantDto {

    @ApiProperty({
        description: 'Rating restaurant',
        type: Number,
        example: 5
    })
    @IsNumber()
    @Min(0)
    @Max(4)
    rating: number;

    @ApiProperty({
        description: 'Name restaurant',
        type: String,
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Web site restaurant',
        type: String,
    })
    @IsString()
    site: string;

    @ApiProperty({
        description: 'Email',
        type: String,
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Phone number',
        type: String,
    })
    @IsString()
    phone: string;

    @ApiProperty({
        description: 'Street restaurant',
        type: String,
    })
    @IsString()
    street: string;

    @ApiProperty({
        description: 'City',
        type: String,
    })
    @IsString()
    city: string;

    @ApiProperty({
        description: 'State',
        type: String,
    })
    @IsString()
    state: string;

    @ApiProperty({
        description: 'Latitude',
        type: Number,
    })
    @IsNumber()
    lat: number;

    @ApiProperty({
        description: 'Longitude',
        type: Number,
    })
    @IsNumber()
    lng: number;

}

//             rating INTEGER, -- Number between 0 and 4

//             name TEXT, -- Name of the restaurant

//             site TEXT, -- Url of the restaurant

//             lat FLOAT, -- Latitude

//             lng FLOAT) -- Longitude
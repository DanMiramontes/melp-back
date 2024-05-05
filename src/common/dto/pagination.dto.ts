import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsOptional, IsPositive } from "class-validator";

export class PaginationDto {
    @ApiProperty({
        default: 10, description: 'Limit rows'
    })
    @IsOptional()
    @IsPositive()
    @Type( () => Number)
    limit?: number;

    @ApiProperty({
        default: 10, description: 'Number page'
    })
    @IsOptional()
    @IsPositive()
    @Type( () => Number)
    page?: number;

    @ApiProperty({
        default: true, description: 'For soft delete ( true = active, false = desactive )'
    })
    @IsOptional()
    @IsBoolean()
    @Type( () => Boolean)
    status?: boolean;
}
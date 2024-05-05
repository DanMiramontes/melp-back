import { Type } from "class-transformer";
import { IsBoolean, IsOptional, IsPositive } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @IsPositive()
    @Type( () => Number)
    limit?: number;

    @IsOptional()
    @IsPositive()
    @Type( () => Number)
    page?: number;

    @IsOptional()
    @IsBoolean()
    @Type( () => Boolean)
    status?: boolean;
}
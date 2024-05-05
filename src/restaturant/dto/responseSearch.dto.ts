import { ApiProperty } from "@nestjs/swagger"

export class responseSearchDto {
    @ApiProperty({
        description: 'count',
        type: Number,
        example: 100
    })
    count: Number;
    @ApiProperty({
        description: 'avg rating',
        type: Number,
        example: 1.45
    })
    avg: Number;
    @ApiProperty({
        description: 'std rating',
        type: Number,
        example: 1.72
    })
    std: Number;
    
}
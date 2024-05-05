import { ApiProperty } from "@nestjs/swagger";

export class ResponseRegisterDto {
    @ApiProperty({
        description: 'id user',
        type: String,
        example: "249b7a53-9c13-4150-a940-1293ef2b1fe4"
    })
    id:string;
    @ApiProperty({
        description: 'username',
        type: String,
        example: "user"
    })
    username: string;
    @ApiProperty({
        description: 'token',
        type: String,
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI0OWI3YTUzLTljMTMtNDE1MC1hOTQwLTEyOTNlZjJiMWZlNCIsImlhdCI6MTcxNDk0Mzk1OSwiZXhwIjoxNzE0OTUxMTU5fQ.SBZtHAWpNc2fDyuE45xQAvd8inkmDzH3vycfDZ1q_X8"
    })
    token: string
}
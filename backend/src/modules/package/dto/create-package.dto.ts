import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsString } from "class-validator";

export class CreatePackageDto {
    @IsArray()
    @ApiProperty()
    items:string[];
}

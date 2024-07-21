import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateItemDto {

    @IsString()
    @ApiProperty()
    name:string;

    @IsNumber()
    @ApiProperty()
    price:number;

    @IsNumber()
    @ApiProperty()
    weight:number;
}

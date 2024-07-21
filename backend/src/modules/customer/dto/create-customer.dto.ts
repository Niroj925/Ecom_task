import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {

    @IsEmail()
    @ApiProperty()
    email:string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    password?:string;

}

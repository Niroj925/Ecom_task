import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { JwtPayload } from "../types/types";
require('dotenv').config();

@Injectable()
export class Token {
    constructor(
        private jwtService: JwtService,
    ) { }

    async generateAcessToken(jwtPayload: JwtPayload) {
        const expirationTimeInSeconds = '45m';
        const token = await this.jwtService.signAsync(jwtPayload, {
            secret: process.env.AT_SECRET,
            expiresIn: expirationTimeInSeconds,
        });
        return token;
    }
}
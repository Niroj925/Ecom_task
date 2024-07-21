import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../types/types";
export declare class Token {
    private jwtService;
    constructor(jwtService: JwtService);
    generateAcessToken(jwtPayload: JwtPayload): Promise<string>;
}

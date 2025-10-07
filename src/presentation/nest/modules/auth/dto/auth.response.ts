import { ApiProperty } from '@nestjs/swagger';
import { AccountResponse } from "./account.response";
import { TokenResponse } from "./token.response";

export class AuthResponse {
    @ApiProperty({ type: TokenResponse })
    tokenResponse: TokenResponse;

    @ApiProperty({ type: AccountResponse })
    accountResponse: AccountResponse;
}
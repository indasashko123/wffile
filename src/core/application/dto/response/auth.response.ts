import { AccountResponse } from "./account.response";
import { TokenResponse } from "./token.response";

export class AuthResponse {
    tokenResponse: TokenResponse;
    accountResponse: AccountResponse;
}
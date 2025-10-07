import { AccessPayload, EntranceToken } from "../../domain/auth";
import { AuthResponse, LoginDto, RegistrationDto, TokenResponse } from "../dto";

export interface IAuthService {
    registration(data: RegistrationDto) : Promise<AuthResponse>;
    login(data: LoginDto) : Promise<AuthResponse>;
    createEntranceToken (accountId: string): Promise<EntranceToken>;
    loginWithEntranceToken(token: string): Promise<AuthResponse>;    
    refresh(token: string): Promise<TokenResponse>;   
    validateAccess(token: string): AccessPayload;
}
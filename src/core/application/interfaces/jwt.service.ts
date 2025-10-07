import { AccessPayload, PayloadRefresh } from "../../../core/domain/auth";
import { TokenResponse } from "../dto";

export interface IJwtService {
    sign(accessPayload: AccessPayload, refreshPayload: PayloadRefresh): TokenResponse; 
    verifyAccess(token: string): AccessPayload;
    verifyRefresh(token: string): PayloadRefresh;
}
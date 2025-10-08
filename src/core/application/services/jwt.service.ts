import { AccessPayload, PayloadRefresh } from "../../../core/domain/auth";
import { TokenResponse } from "../dto";
import { IJwtService } from "../interfaces";
import { sign, verify } from 'jsonwebtoken';
import { IConfig } from "../config";
import { CommonError } from "../common/exceptions";

export abstract class JwtAbstractService implements IJwtService {
  private readonly accessSecretKey : string;
  private readonly refreshSecretKey : string;
  private readonly accessExpire : number;
  private readonly refreshExpire : number;

  constructor (
    config : IConfig
  ) {
    this.accessSecretKey = config.authConfig.accSecret;
    this.refreshSecretKey = config.authConfig.refSecret;
    this.accessExpire = config.authConfig.accessExpire;
    this.refreshExpire = config.authConfig.refreshExpire;
  }

  sign(accessPayload:AccessPayload,refreshPayload: PayloadRefresh): TokenResponse {
    const accessToken = sign(accessPayload, this.accessSecretKey, {
      expiresIn: this.accessExpire,
    });
    const refreshToken = sign(refreshPayload, this.refreshSecretKey, {
      expiresIn: this.refreshExpire,
    });
    return { access: accessToken, refresh: refreshToken };
  }

  verifyRefresh(token: string): PayloadRefresh {
    try {
      const tokenData = verify(token, this.refreshSecretKey);
      const payload: PayloadRefresh = tokenData as PayloadRefresh;
      return payload;
    } catch (error) {
      throw CommonError.Unauthorized('Invalid token');
    }
  }

  verifyAccess(token: string): AccessPayload {
    try {
      const tokenData = verify(token, this.accessSecretKey);
      const payload: AccessPayload = tokenData as AccessPayload;
      return payload;
    } catch (error) {
      console.log(error);
      CommonError.Unauthorized('Invalid token');
    }
  }
}
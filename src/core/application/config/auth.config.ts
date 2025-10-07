export interface IAuthConfig {
  accSecret: string;
  refSecret: string;
  accessExpire : number;
  refreshExpire : number;
}

export class AuthConfig implements IAuthConfig {
  accSecret: string;
  refSecret: string;
  accessExpire : number;
  refreshExpire : number;
  constructor() {
    this.accSecret = process.env.ACCESS_SECRET || 'access';
    this.refSecret = process.env.REFRESH_SECRET || 'secret';
    this.accessExpire = Number(process.env.ACCESS_EXPIRE) || 60 * 1000;
    this.refreshExpire = Number(process.env.REFRESH_EXPIRE) || 60 * 24 * 60 * 60 * 1000;
  }
}

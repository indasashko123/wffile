export interface IServerConfig {
  port: number;
  entranceExpire: number;
}
export class ServerConfig implements IServerConfig {
  port: number;
  entranceExpire: number;
  constructor() {
    this.port = Number(process.env.PORT) || 3002;
    this.entranceExpire =Number(process.env.ENTRANCE_EXPIRE);
  }
}

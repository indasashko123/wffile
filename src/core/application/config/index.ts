import * as dotenv from 'dotenv';
import { AuthConfig, IAuthConfig } from './auth.config';
import { IPostgresConfig, PostgresConfig } from './postgres.config';
import { IRedisConfig, RedisConfig } from './redis.config';
import { IServerConfig, ServerConfig } from './server.config';
import { FileStorageConfig, IFileStorageConfig } from './fileStorage.config';


dotenv.config();



export interface IConfig {
  authConfig: IAuthConfig;
  postgresConfig: IPostgresConfig;
  serverConfig: IServerConfig;
  redisConfig: IRedisConfig;
  fileStorageConfig: IFileStorageConfig;
}

export abstract class ConfigAbstractService implements IConfig {
  authConfig: IAuthConfig;
  postgresConfig: IPostgresConfig;
  serverConfig: IServerConfig;
  redisConfig: IRedisConfig;
  fileStorageConfig: IFileStorageConfig;
  constructor() {
    this.authConfig = new AuthConfig();
    this.postgresConfig = new PostgresConfig();
    this.serverConfig = new ServerConfig();
    this.redisConfig = new RedisConfig();
    this.fileStorageConfig = new FileStorageConfig();
  }
}

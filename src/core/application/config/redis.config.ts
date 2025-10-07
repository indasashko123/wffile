export interface IRedisConfig {
    host: string;
    port: number;
}

export class RedisConfig implements IRedisConfig {
    host: string;
    port: number;
    constructor() {
        this.port = Number(process.env.REDIS_PORT) || 5656;
        this.host = process.env.REDIS_HOST || 'localhost'
    }
}
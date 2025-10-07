import { IConfig } from "../../core/application/config";
import Redis from "ioredis";




export abstract class RedisAbstractConnection {
    private readonly client: Redis;

    constructor(
        config: IConfig
    ) {
        this.client = this.createClient(config);
        this.client.on('connect', ()=> {
            console.log(`Redis подключен`);
        })
        this.client.on('error', (err) => {
            console.error('Ошибка подключения к Redis:', err);
        });
        this.client.on('end', () => {
            console.log('Соединение с Redis закрыто');
        });
    }

    private createClient(config: IConfig): Redis {
        const client: Redis = new Redis({
            host : config.redisConfig.host,
            port : config.redisConfig.port,
        });
        return client;
    }

    public getClient(): Redis {
       return this.client;
   }
}
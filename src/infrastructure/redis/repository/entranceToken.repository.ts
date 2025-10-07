import { CreateEntranceTokenDto, EntranceToken, IEntranceTokenRepository } from "../../../core/domain/auth";
import { RedisAbstractConnection } from "../connection";
import { v4 } from "uuid";
import { IConfig } from "../../../core/application/config";
import { CommonError } from "../../../core/application/common/exceptions";



export abstract class EntranceTokenAbstractRepository  implements IEntranceTokenRepository {
    
    private readonly path : string = 'entrance';

    constructor (
        private readonly redis : RedisAbstractConnection,
        private readonly config: IConfig,
    ) {
    }
    
    async create (data : CreateEntranceTokenDto) : Promise<EntranceToken> {
        const redisClient = this.redis.getClient();
        const token : EntranceToken = {
            accountId: data.accountId,
            id : v4()
        }
        const tokenData = JSON.stringify(token);
        await redisClient.set(token.id+this.path, tokenData, "EX", this.config.serverConfig.entranceExpire);
        return token;
    }
    async getOrThrow(id : string) : Promise<EntranceToken> {
        const redisClient = this.redis.getClient();
        const tokenData = await redisClient.get(id+this.path);
        if (!tokenData) {
            CommonError.NotFound(`LINK NOT FOUND`);
        }
        return JSON.parse(tokenData);
    }
}
import { CreateEntranceTokenDto } from "../dto";
import { EntranceToken } from "../entities";

export interface IEntranceTokenRepository {
    getOrThrow(id: string): Promise<EntranceToken>;
    create(dto: CreateEntranceTokenDto): Promise<EntranceToken>;
}
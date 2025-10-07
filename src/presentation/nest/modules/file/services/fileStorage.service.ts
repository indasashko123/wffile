import { Inject, Injectable } from "@nestjs/common";
import { IConfig, LocalStorageAbstractService } from "../../../../../core/application";
import { INFRASTRUCTURE_CONSTANTS } from "../../constants";

@Injectable()
export class FileStorageService extends LocalStorageAbstractService {
    constructor(
        @Inject(INFRASTRUCTURE_CONSTANTS.CONFIG) config: IConfig
    ) {
        super(config);
    }
}
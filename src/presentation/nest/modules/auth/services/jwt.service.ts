import { Inject, Injectable } from "@nestjs/common";
import { JwtAbstractService } from "../../../../../core/application/services";
import { INFRASTRUCTURE_CONSTANTS } from "../../constants";
import { IConfig } from "../../../../../core/application";


@Injectable()
export class JwtService extends JwtAbstractService {
    constructor(
        @Inject(INFRASTRUCTURE_CONSTANTS.CONFIG) config: IConfig
    ) {
        super(config);
    }
}
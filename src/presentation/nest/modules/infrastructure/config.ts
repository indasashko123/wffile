import { Injectable } from "@nestjs/common";
import { ConfigAbstractService } from "../../../../core/application";

@Injectable()
export class ConfigService extends ConfigAbstractService {
    constructor() {
        super();
    }
}
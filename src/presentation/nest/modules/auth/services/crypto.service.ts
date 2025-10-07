import { Injectable } from "@nestjs/common";
import { CryptoAbstractService } from "../../../../../core/application";

@Injectable()
export class CryptoService extends CryptoAbstractService {
    constructor() {
        super();
    }
}
import { Injectable } from "@nestjs/common";
import { FilePathAbstractRepository } from "../../../../../infrastructure/postgres";

@Injectable()
export class FilePathRepository extends FilePathAbstractRepository {
    constructor() {
        super();
    }
}
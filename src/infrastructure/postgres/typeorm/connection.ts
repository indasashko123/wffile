import { DataSource } from "typeorm";
import { AppDataSource } from "./migrations/data-source";

export abstract class TypeOrmAbstractConnection {
    private readonly dataSource : DataSource;
    constructor (
    ) {
        this.dataSource = AppDataSource
    }

    public getClient() : DataSource {
        return this.dataSource;
    }
}
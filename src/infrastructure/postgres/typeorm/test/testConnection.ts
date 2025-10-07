import { DataSource } from "typeorm";
import { AccountModel } from "../models/account.model";
import * as dotenv from "dotenv";


export class TypeOrmTestConnection {
    private readonly dataSource: DataSource;

    constructor() {
        if (!process.env.CI) {
            dotenv.config({path: "./.env.test"});
        }
        this.dataSource = new DataSource({
            type: 'postgres',
            host: process.env.TEST_DB_HOST,
            port: Number(process.env.TEST_DB_PORT),
            username: process.env.TEST_DB_USERNAME,
            password: process.env.TEST_DB_PASSWORD,
            database: process.env.TEST_DATABASE,
            entities: [AccountModel],
            synchronize: true,
            dropSchema: true,
            logging: false,
            ssl: false,
            cache: false,
        });
    }
    public getClient(): DataSource {
        return this.dataSource;
    }
}
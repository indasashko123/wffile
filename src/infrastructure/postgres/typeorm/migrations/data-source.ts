import { ConfigAbstractService } from '../../../../core/application/config';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';
import { DataSource } from 'typeorm';
import { init1759790518512 } from './components/1759790518512-init';

  dotenv.config();

class Config extends ConfigAbstractService {
    constructor() {
        super();
    }
}
const config = new Config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: config.postgresConfig.host,
    port: config.postgresConfig.port,
    username: config.postgresConfig.username,
    password:  config.postgresConfig.password,
    database: config.postgresConfig.database,
    entities: [
        fs.existsSync(path.join(process.cwd(), 'dist'))
        ? path.join(process.cwd(), 'dist/src/**/*.model{.ts,.js}')
        : path.join(process.cwd(), 'src/**/*.model{.ts,.js}'),
    ],
  synchronize: false, 
  logging: false,
  ssl: false,
  cache: true,
  migrations: [
    init1759790518512
  ],
});

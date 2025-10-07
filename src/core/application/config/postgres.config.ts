export interface IPostgresConfig {
  username: string;
  password: string;
  host: string;
  port: number;
  database: string;
}

export class PostgresConfig implements IPostgresConfig {
  username: string;
  password: string;
  host: string;
  port: number;
  database: string;
  constructor() {
    this.username = process.env.DATABASE_USER || 'postgres';
    this.password = process.env.DATABASE_PASSWORD || 'root';
    this.host = process.env.DATABASE_HOST || 'localhost';
    this.port = Number(process.env.DATABASE_PORT) || 5432;
    this.database = process.env.DATABASE_NAME || 'default';
  }
}

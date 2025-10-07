export interface  ICryptoService  {
  hashPassword(pass: string): Promise<string>;
  comparePassword(pass: string, hash: string): Promise<boolean>;
}

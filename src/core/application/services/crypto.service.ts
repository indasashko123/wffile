import { ICryptoService } from "../interfaces";
import { compare, hash } from 'bcrypt';

export abstract class CryptoAbstractService implements ICryptoService  {
  async hashPassword(pass: string): Promise<string> {
    return await hash(pass, 10);
  }
  async comparePassword(pass: string, hash: string): Promise<boolean> {
    return await compare(pass, hash);
  }
}

import { AccessPayload, EntranceToken, IAccountRepository, IEntranceTokenRepository, IRegistrationCommand } from "../../domain/auth";
import { AuthResponse, LoginDto, RegistrationDto, TokenResponse } from "../dto";
import { IAuthService, ICryptoService, IJwtService } from "../interfaces";
import { CommonError } from "../common/exceptions";

export abstract class AuthAbstractService implements IAuthService {
    
    constructor(
        private readonly  registrationCommand: IRegistrationCommand,
        private readonly accountRepository: IAccountRepository,
        private readonly cryptoService: ICryptoService,
        private readonly jwtService: IJwtService,
        private readonly entranceTokenRepository: IEntranceTokenRepository
    ) {

    }
    validateAccess(token: string): AccessPayload {
        return  this.jwtService.verifyAccess(token);
    }
    async refresh(token: string): Promise<TokenResponse> {
        const refreshPayload = this.jwtService.verifyRefresh(token);
        const account = await this.accountRepository.getById(refreshPayload.sub);
        if (!account) {
            CommonError.BadRequest('Account is not exist');
        }
        return this.jwtService.sign({
            login: account.login, 
            sub: account.id
        }, {
            sub: account.id
        });
    }

    async registration(data: RegistrationDto) : Promise<AuthResponse> {
        const hashedPassword = await this.cryptoService.hashPassword(data.password);
        const account = await this.registrationCommand.execute({
            login: data.login,
            password: hashedPassword,
        });
        const tokens = this.jwtService.sign({
            login: account.login,
            sub: account.id
        }, {
            sub: account.id
        });

        return {
            accountResponse: {
                login: account.login
            },
            tokenResponse: {
                access: tokens.access,
                refresh: tokens.refresh
            }
        }
    }
    
    async login(data: LoginDto) : Promise<AuthResponse> {
        const account = await this.accountRepository.getByLogin(data.login);
        if (!account) {
            CommonError.BadRequest('wrong login or password');
        }
        const comparedPassword = await this.cryptoService.comparePassword(data.password, account.password);
        if (!comparedPassword) {
            CommonError.BadRequest('wrong login or password');
        }
        const tokens = this.jwtService.sign({
            login: account.login,
            sub: account.id
        }, {
            sub: account.id
        });
        return {
            accountResponse: {
                login: account.login
            },
            tokenResponse: {
                access: tokens.access,
                refresh: tokens.refresh
            }
        }
    }

    async createEntranceToken (accountId: string): Promise<EntranceToken> {
        const token = await this.entranceTokenRepository.create({
            accountId: accountId
        });
        return token;
    }
    async loginWithEntranceToken(tokenId: string): Promise<AuthResponse> {
        const token = await this.entranceTokenRepository.getOrThrow(tokenId);
        const account = await this.accountRepository.getById(token.accountId);
        if (!account) {
            CommonError.BadRequest('Account is not exist');            
        }
        const tokens = this.jwtService.sign({
            login: account.login,
            sub: account.id
        }, {
            sub: account.id
        });
        return {
            accountResponse: {
                login: account.login
            },
            tokenResponse: {
                access: tokens.access,
                refresh: tokens.refresh
            }
        }
    }
}
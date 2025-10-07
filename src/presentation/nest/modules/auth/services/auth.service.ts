import { Inject, Injectable } from "@nestjs/common";
import { AuthAbstractService, ICryptoService, IJwtService } from "../../../../../core/application";
import { AUTH_CONSTANTS } from "../../constants";
import { IAccountRepository, IEntranceTokenRepository, IRegistrationCommand } from "../../../../../core/domain/auth";


@Injectable()
export class AuthService extends AuthAbstractService {
    constructor(
        @Inject(AUTH_CONSTANTS.REGISTRATION_COMMAND) registrationCommand: IRegistrationCommand,
        @Inject(AUTH_CONSTANTS.ACCOUNT_REPOSITORY) accountRepository: IAccountRepository,
        @Inject(AUTH_CONSTANTS.CRYPTO_SERVICE) cryptoService: ICryptoService,
        @Inject(AUTH_CONSTANTS.JWT_SERVICE) jwtService: IJwtService,
        @Inject(AUTH_CONSTANTS.ENTRANCE_TOKEN_REPOSITORY) entranceTokenRepository: IEntranceTokenRepository
    ) {
       super(
           registrationCommand,
            accountRepository,
            cryptoService,
            jwtService,
            entranceTokenRepository
       ); 
    }
}
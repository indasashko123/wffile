import { Module } from "@nestjs/common";
import { AUTH_CONSTANTS } from "../constants";
import { AccountRepository, EntranceTokenRepository } from "./repositories";
import { AuthService, CryptoService, JwtService } from "./services";
import { RegistrationCommand } from "./comands";
import { AuthController } from "./controllers";
import { AuthGuard } from "./guards";
import { InfrastructureModule } from "../infrastructure";


@Module({
    imports: [InfrastructureModule],
    providers: [
        {provide: AUTH_CONSTANTS.ACCOUNT_REPOSITORY, useClass: AccountRepository},
        {provide: AUTH_CONSTANTS.AUTH_SERVICE, useClass: AuthService},
        {provide: AUTH_CONSTANTS.CRYPTO_SERVICE, useClass: CryptoService},
        {provide: AUTH_CONSTANTS.ENTRANCE_TOKEN_REPOSITORY, useClass: EntranceTokenRepository},
        {provide: AUTH_CONSTANTS.JWT_SERVICE, useClass: JwtService},
        {provide: AUTH_CONSTANTS.REGISTRATION_COMMAND, useClass: RegistrationCommand},
        AuthGuard
    ],
    controllers: [
        AuthController
    ],
    exports: [
        AuthGuard, 
        AUTH_CONSTANTS.AUTH_SERVICE
    ]
})
export class AuthModule {}
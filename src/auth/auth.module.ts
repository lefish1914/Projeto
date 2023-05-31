/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports:[JwtModule.register({
        secret:'`.[cEm+s#fLMwi,r)nr3<EC%&_aUKK9$'
    })]
})
export class AuthModule {
}
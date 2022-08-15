import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/input/login-input.dto';
import { LoginResponse } from './dto/response/login-response.dto';
import { Response } from 'express';
import { LogoutResponse } from './dto/response/logut-response.dto';

@Resolver()
export class AuthResolver {
    constructor( private readonly authService: AuthService) {}

    @Mutation(() => LoginResponse, {name: 'login'})
    login(@Args('loginInput') loginInput: LoginInput, @Context('res') res: Response ): Promise<LoginResponse> {

        return this.authService.login(loginInput, res);
    }

    @Mutation(() => LogoutResponse, {name: 'logout'})
    logout(@Context('res') res: Response ): Promise<LogoutResponse> {
            
            return this.authService.logout(res);
    }
}

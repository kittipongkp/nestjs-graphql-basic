import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';
import { LoginInput } from './dto/input/login-input.dto';
import { LoginResponse } from './dto/response/login-response.dto';
import { Response } from 'express'
import { LogoutResponse } from './dto/response/logut-response.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        ) {}

    async login(inputLogin: LoginInput, response: Response): Promise<LoginResponse> {

       

        const user = await this.usersService.validateUser(inputLogin.email, inputLogin.password);
        if(!user){
            throw new UnauthorizedException();
        }

        const tokenPayload = {
            userId: user._id,
        }

        const expires = new Date();
        expires.setSeconds(
            expires.getSeconds() + this.configService.get('JWT_EXPIRATION')
        )

        const token = this.jwtService.sign(tokenPayload);

        response.cookie('Authentication', token, {
            httpOnly: true,
            expires,
        })

        return {
            user: user,
            token: token,

        };
    }

    async logout(response: Response): Promise<LogoutResponse> {
        response.clearCookie('Authentication');
        return {
            message: 'Logout success',
        };
    }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.usersService.validateUser(email, password);
        if (user) {
            return user;
        }
        return null;
    } 
}

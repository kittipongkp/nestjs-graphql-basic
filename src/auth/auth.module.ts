import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthResolver } from './auth.resolver';
import { Response } from 'express';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService)=> ({
        secret: configService.get('JWT_SECRET'),
         signOptions: { expiresIn: `${configService.get('JWT_EXPIRATION')}s` },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, AuthResolver],
})
export class AuthModule {}
   
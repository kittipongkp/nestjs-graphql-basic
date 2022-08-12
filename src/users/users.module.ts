import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { UserSchema } from './models/user.schema';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])
  ],
  providers: [UsersResolver, UsersService, UserRepository ]
})
export class UsersModule {}

import { CreateUserInput } from './dto/input/create-user-input.dto';
import { Args, Mutation, Query ,Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { GetUserArgs } from './dto/args/get-user-args.dto';

@Resolver(()=>User)
export class UsersResolver {
  constructor(private readonly usersService : UsersService) {}

    @Mutation(()=>User)
    async createUser(@Args('createUserData') createUserData: CreateUserInput){
       // console.log("createUserData", createUserData);
        return this.usersService.createUser(createUserData);
    }

    @Query(()=>User, {name: 'user'})
    async getUser(@Args() getUserArgs: GetUserArgs){
        return this.usersService.getUser(getUserArgs);
    }

}

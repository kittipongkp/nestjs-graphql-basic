import { CreateUserInput } from './dto/input/create-user-input.dto';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { GetUserArgs } from './dto/args/get-user-args.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { User } from './models/user.model';
import { UserDocument } from './models/user.schema';

@Injectable()
export class UsersService {

    constructor(private readonly userRepository: UserRepository) { }

    async createUser(createUserData: CreateUserInput) {
        await this.validateCreateUserData(createUserData);

        const userDocument = await this.userRepository.create({ 
            ...createUserData, 
            password: await bcrypt.hash(createUserData.password, 10) 
        });

        return this.toModel(userDocument);

    }

    private async validateCreateUserData(createUserData: CreateUserInput) {
        try {
            await this.userRepository.findOne({ email: createUserData.email });
            throw new UnprocessableEntityException('User with this email already exists');
        } catch (error) {

        }
    }

    private toModel(userDocument: UserDocument): User {
        return {
            _id: userDocument._id.toHexString(),
            email: userDocument.email,
        };
    }

    async getUser(getUserArgs: GetUserArgs) {
        const userDocument = await this.userRepository.findOne({getUserArgs});
        return this.toModel(userDocument);

     } 
}
import { CreateUserInput } from './dto/input/create-user-input.dto';
import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { GetUserArgs } from './dto/args/get-user-args.dto';
import { UsersRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { User } from './models/user.model';
import { UserDocument } from './models/user.schema';

@Injectable()
export class UsersService {

    constructor(private readonly usersRepository: UsersRepository) { }

    async createUser(createUserData: CreateUserInput) {
        try {
            const emailAlready = await this.validateCreateUserData(createUserData);
            if (emailAlready) {
                throw new UnprocessableEntityException('Email already exists');
            }

            const userDocument = await this.usersRepository.create({
                ...createUserData,
                password: await bcrypt.hash(createUserData.password, 10)
            });

            return this.toModel(userDocument);
        } catch (error) {
            throw new UnprocessableEntityException(error.message);
        }

    }

    private async validateCreateUserData(createUserData: CreateUserInput) {
        try {
            await this.usersRepository.findOne({ email: createUserData.email });
            return true;
        } catch (err) {
            return false;
        }
    }

    private toModel(userDocument: UserDocument): User {
        return {
            _id: userDocument._id.toHexString(),
            email: userDocument.email,
        };
    }

    async validateUser(email: string, password: string) {
        try {

            const userDocument = await this.usersRepository.findOne({ email });
            if (!userDocument) {
                throw new UnauthorizedException('Credentials are not valid.');
            }
            const passwordIsValid = await bcrypt.compare(
                password,
                userDocument.password,
            );
            if (!passwordIsValid) {
                throw new UnauthorizedException('Credentials are not valid.');
            }
            return this.toModel(userDocument);

        } catch (error) {

        }
    }



    async getUser(getUserArgs: GetUserArgs) {
        const userDocument = await this.usersRepository.findOne({ getUserArgs });
        return this.toModel(userDocument);

    }
}

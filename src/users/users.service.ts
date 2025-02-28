import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

  async create(createUserDto: CreateUserDto) {
    const hashPassword = this.getHashPassword(createUserDto.password);
    const user = await this.userModel.create({
      email: createUserDto.email,
      password: hashPassword,
      name: createUserDto.name,
    });
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    try {
      return await this.userModel.findOne({ _id: id });
    } catch (error) {
      return 'not found user';
    }
  }

  async update(updateUserDto: UpdateUserDto) {
    try {
      return await this.userModel.findByIdAndUpdate(
        { _id: updateUserDto.id },
        { ...UpdateUserDto },
      );
    } catch (error) {
      return error;
    }
  }

  async delete(deleteUserDto: DeleteUserDto) {
    try {
      return await this.userModel.deleteOne({ _id: deleteUserDto.id });
    } catch (error) {
      return error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

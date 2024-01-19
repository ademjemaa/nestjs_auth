import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/types/user';
import { RegisterDto } from './register.dto';

@Injectable()
export class UserService {
    constructor (
        @InjectModel('User') private userModel : Model<User>
    ) {}

    async create(RegisterDto : RegisterDto)
    {
        const { email } = RegisterDto;
        const user = await this.userModel.findOne({ email });
        if (user) 
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)

        const createdUser = new this.userModel()
    }
}

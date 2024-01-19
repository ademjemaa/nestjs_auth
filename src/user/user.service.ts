import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/types/user';
import { RegisterDto } from './register.dto';
import { LoginDTO } from 'src/auth/login.dto';

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

        const createdUser = new this.userModel(RegisterDto);
        await createdUser.save();
        return this.sanitizeUser(createdUser);
    }

    sanitizeUser(user : User)
    {
        const sanitized = user.toObject();
        delete sanitized['password'];
        return sanitized;
    }

    async findByPayload(payload : any)    
    {
        const { email } = payload;
        return await this.userModel.findOne({ email });
    }

    async findByLogin(LoginDTO : LoginDTO)
    {
        const  { email } = LoginDTO;
        const user = await this.userModel.findOne({ email });
        return user;
    }

}

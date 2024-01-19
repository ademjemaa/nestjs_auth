import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(private userService : UserService) {}

    async signPayload(payload : any)
    {
        console.log(process.env.SECRET_KEY);
        return sign(payload, process.env.SECRET_KEY, { expiresIn : '7d' });
    }
}

import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/user/register.dto';
import { LoginDTO } from './login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService : UserService,
        private readonly authService : AuthService
    ) {}

    @Post('register')
    async register(@Body() registerDto : RegisterDto)
    {
        const user = await this.userService.create(registerDto);
        const payload = {
            email : user.email,
        };

        const token = await this.authService.signPayload(payload);
        return { user, token };
    }

    @Post('login')
    async login(@Body() User : LoginDTO)
    {
        const user = await this.userService.findByLogin(User);
        const payload =  {
            email : user.email
        };
        const token = await this.authService.signPayload(payload);
        return { user, token };
    }
}

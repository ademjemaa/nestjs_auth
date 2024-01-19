import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard'
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

    @Get("onlyauth")
    @UseGuards(AuthGuard("jwt"))
    async onlyauth()
    {
        return "hidden";
    }

    @Get("anyone")
    async publicinfo()
    {
        return "public info";
    }

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

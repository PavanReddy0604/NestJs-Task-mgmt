import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){
    }

    @Post('/signup')
    async creatAccount(@Body() authCredentialsDTO:AuthCredentialsDTO){
        await this.authService.signUp(authCredentialsDTO);
       return "user added succesfully";
    }
}

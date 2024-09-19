import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {  

    constructor(@InjectRepository(User) private readonly userRepository:Repository<User>){}


    async signUp(authCredentialsDTO: AuthCredentialsDTO):Promise<void>{
        try{
            Logger.log(`Request for SIGN UP of User ${authCredentialsDTO.username}`);
            const user={
                username:authCredentialsDTO.username,
                password:this.encode(authCredentialsDTO.password)
            }
           await this.userRepository.save(user)
        }
        catch(error){
            Logger.error(`Exception occurred while Signing Up ${error}`);
            throw new InternalServerErrorException("Sign Up Failed. Please try again");
        }
    }

    encode(data: string): string {
        return Buffer.from(data).toString('base64');
      }

      decode(base64Data: string): string {
        return Buffer.from(base64Data, 'base64').toString();
      }

}

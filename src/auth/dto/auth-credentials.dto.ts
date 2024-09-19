import { IsNotEmpty, IsString } from "class-validator";

export class AuthCredentialsDTO{
    
    @IsString()
    @IsNotEmpty()
    username:string;
    @IsString()
    @IsNotEmpty()
    password:string;

}
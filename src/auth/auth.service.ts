import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces';
import { LoginUserDto } from './dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    private readonly jwtService: JwtService
  ){}

  async create(createAuthDto: CreateAuthDto) {

    try {
      const user = this.authRepository.create({
        ...createAuthDto,
        password: bcrypt.hashSync(createAuthDto.password, 10 )
      });
  
      await this.authRepository.save( user);
      delete user.password;
      return {
        ...user,
        token: this.getJwtToken({ id: user.id}),
      }
    } catch (error) {
      this.handleDBErros(error);
    }
  }

  async login(loginUserDto: LoginUserDto){
    const { username, password } = loginUserDto;


    const user = await this.authRepository.findOne({
      where: { username },
      select: { username: true, password: true, id: true}
    });

    if(!user) {
      throw new UnauthorizedException("Credentials are not valid");

    }

    if(!bcrypt.compareSync(password, user.password)){
      throw new UnauthorizedException("Credential are not valid");

    }
    return {
      ...user,
      token: this.getJwtToken({ id: user.id}),
    };

  }

  private getJwtToken( payload: JwtPayload)  {

    const token = this.jwtService.sign( payload );
    return token;

  }

  private handleDBErros (error: any): never{
    if( error.code === '23505' )
    {
      throw new BadRequestException( error.detail );
    }

    console.log(error);

    throw new InternalServerErrorException('Please check server logs');

  }
}

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../users/services/users.service.js';
import * as bcrypt from 'bcrypt';
import { JwtToolsService } from '../../jwt/services/jwt-tools.service.js';
import { JwtTokenPayload } from '../interfaces/token-payload.interface.js';
import { config } from '../../config/config.js';
import { SignUpResponseDto } from '../dto/sign-up-response.dto.js';
import { SignUpDto } from '../dto/sign-up.dto.js';
import { SignInResponseDto } from '../dto/sign-in-response.dto.js';
import { SignInDto } from '../dto/sign-in.dto.js';
import { CreateUserDto } from '../../users/dto/create-user.dto.js';

@Injectable()
export class AuthService {
  private readonly saltRounds = 5;
  private readonly JWT_ACCESS_SECRET_KEY = config.JWT_ACCESS_SECRET_KEY;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtToolsService: JwtToolsService,
  ) {}

  //------------------------------------------------------------------------
  public async signUp({
    email,
    password,
  }: SignUpDto): Promise<SignUpResponseDto> {
    const user = await this.usersService.findOneFor({ email: email });

    if (user) {
      throw new BadRequestException('🚨 user is already exist!');
    }

    const hashedPassword = bcrypt.hashSync(password, this.saltRounds);

    const newUserOptions: CreateUserDto = {
      email: email,
      password: hashedPassword,
    };

    const newUser = await this.usersService.create(newUserOptions);

    const atPayload: JwtTokenPayload = {
      sub: newUser.id,
      email: newUser.email,
    };

    const accessToken = await this.jwtToolsService.createToken(
      atPayload,
      this.JWT_ACCESS_SECRET_KEY,
      '60m',
    );

    return { token: accessToken };
  }

  //------------------------------------------------------------------------
  public async signIn({
    email,
    password,
  }: SignInDto): Promise<SignInResponseDto> {
    const user = await this.usersService.findOneFor({ email: email });

    if (!user) {
      throw new UnauthorizedException('🚨 incorrect login or password!');
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('🚨 incorrect login or password!');
    }

    const atPayload: JwtTokenPayload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = await this.jwtToolsService.createToken(
      atPayload,
      this.JWT_ACCESS_SECRET_KEY,
      '5m',
    );

    return { token: accessToken };
  }
}

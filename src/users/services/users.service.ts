import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity.js';
import { CreateUserOptions } from '../interfaces/create-user-options.interface.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findOneFor(options: Partial<User>): Promise<User | null> {
    return this.userRepository.findOne({ where: options });
  }

  public async create(options: CreateUserOptions): Promise<User> {
    return this.userRepository.save(options);
  }
}

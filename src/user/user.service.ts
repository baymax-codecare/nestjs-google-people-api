import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    public userRepo: Repository<User>,
  ) {}

  public create(createUserDto: any): Promise<User> {
    const user = this.userRepo.create(createUserDto as User);

    return this.userRepo.save(user);
  }
}

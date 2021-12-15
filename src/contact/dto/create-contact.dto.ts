import { User } from './../../user/user.entity';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsOptional()
  public name?: string;

  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public user: User;
}

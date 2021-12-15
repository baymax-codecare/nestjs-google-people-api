import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepo: Repository<Contact>,
  ) {}
  public async createMany(manyContactsDto: CreateContactDto[]): Promise<void> {
    this.contactRepo
      .createQueryBuilder()
      .insert()
      .into(Contact)
      .values(manyContactsDto)
      .execute();
  }
  public async getContactsByUserId(userId: number): Promise<Contact[]> {
    return this.contactRepo.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }
  public async getAll(): Promise<Contact[]> {
    return this.contactRepo.find();
  }
}

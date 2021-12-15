import { ContactService } from './contact.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}
  @Get(':id')
  public async list(@Param('id') id: number) {
    return await this.contactService.getContactsByUserId(id);
  }

  @Get()
  public async findAll() {
    return await this.contactService.getAll();
  }
}

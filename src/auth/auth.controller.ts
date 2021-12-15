import { CreateContactDto } from '../contact/dto/create-contact.dto';
import { ContactService } from '../contact/contact.service';
import { UserService } from './../user/user.service';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('connect')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly contactService: ContactService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    const user = req.user;
    // If user is new, register user & import contacts
    if (!!user.isNew) {
      const newUser = await this.userService.create({
        fname: user.fname,
        lname: user.lname,
        email: user.email,
      });

      // TODO: check if there's any update in user's contacts
      // Now only initiated for the first login (Test version)

      if (user.accessToken) {
        const { accessToken } = req.user;
        const contacts = await this.authService.getContacts(
          accessToken,
          newUser,
        );
        this.contactService.createMany(contacts as CreateContactDto[]);
      }
      return 'Successfully imported contacts';
    } else {
      return 'Already imported';
    }
  }
}

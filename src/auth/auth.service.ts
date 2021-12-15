import { User } from './../user/user.entity';
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
@Injectable()
export class AuthService {
  async getContacts(accessToken: string, user: User) {
    const service = google.people({ version: 'v1' });
    // TODO: pageSize has 1000 as limit -
    // implement recursive fetch when user has more than 1000 contacts
    const res = await service.people.connections.list({
      resourceName: 'people/me',
      personFields: 'names,emailAddresses',
      pageSize: 1000,
      access_token: accessToken,
    });

    const {
      data: { connections },
    } = res;
    const contacts = connections.map((item) => {
      let contact = {};

      // Some contacts don't have displayName...
      // Check if names exist in contact
      if (item.names && item.names.length > 0) {
        contact = {
          name: item?.names[0]?.displayName,
        };
      }

      contact = {
        ...contact,
        user,
        email: item?.emailAddresses[0]?.value,
      };
      return contact;
    });
    return contacts;
  }
}

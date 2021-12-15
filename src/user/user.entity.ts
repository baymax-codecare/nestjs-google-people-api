import { Contact } from '../contact/contact.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public fname: string;

  @Column()
  public lname: string;

  @Column()
  public email: string;

  @OneToMany(() => Contact, (contact) => contact.user, { cascade: true })
  public contacts: Contact[];
}

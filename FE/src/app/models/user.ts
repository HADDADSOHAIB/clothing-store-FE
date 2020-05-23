import { Address } from './address';
import { Role } from './role';

export class User {
  constructor(
    public id: number,
    public userEmail: string,
    public userName: string,
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public addresses: Address[],
    public role: string,
    public password: string,
    public passwordConfirmation: string
  ) {}
}

import { Address } from './address';

export class User{
    
    constructor(
        public userEmail:string,
        public userName:string,
        public firstName: string,
        public lastName: string,
        public phoneNumber: string,
        public addresses: Address[],
    ) {}
}

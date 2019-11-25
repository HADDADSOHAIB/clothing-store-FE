import { Address } from './address';

export class ShippingInfos{
    
    constructor(
        public firstName:string,
        public lastName: string,
        public phoneNumber: string,
        public address: Address
        ) {
    }
}
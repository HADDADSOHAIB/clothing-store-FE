import { Address } from './address';

export class ShippingInfos {
  constructor(
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public firstLine: string,
    public secondLine: string,
    public city: string,
    public state: string,
    public country: string,
    public zipCode: string
  ) {}
}

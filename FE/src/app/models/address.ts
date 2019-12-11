export class Address{

    constructor(
        public id: number,
        public firstLine: string,
        public secondLine: string,
        public city: string,
        public state: string,
        public country: string,
        public zipCode: string
    ){}
}
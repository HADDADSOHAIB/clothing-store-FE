import { Privilege } from './privilege';

export class Role {
    constructor(
        public id: number,
        public name: string,
        public privileges: Privilege[]
    ) {

    }
}

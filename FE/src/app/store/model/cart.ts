import { CartItem } from './CartItem';

export class Cart{
    
    constructor(
        public cartId:number, 
        public ownerToken:string,
        public items:CartItem[]
    ) {}

    itemCount(id:number){
        let index=this.items.findIndex(item=>item.itemId===id);
        if(index===-1)
            return 0;
        return this.items[index].itemQuantity;
        
    }

    totalCount(){
        let total=0;
        this.items.forEach(item=>total+=item.itemQuantity);
        return total;
    }

    indexByProduct(id){
        return this.items.findIndex(item=>item.itemId===id);
      }
}
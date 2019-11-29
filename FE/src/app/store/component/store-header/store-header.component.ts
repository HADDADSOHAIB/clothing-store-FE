import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../service/cart-service/cart.service';
import { take } from 'rxjs/operators';
import { Cart } from 'src/app/shared/Models/cart';
import { UUID } from 'angular2-uuid';
import { User } from 'src/app/shared/Models/user';
import { AccountService } from 'src/app/shared/services/account-service/account.service';
import { Category } from 'src/app/shared/Models/category';
import { ProductsService } from 'src/app/shared/services/products-service/products.service';

@Component({
  selector: 'store-header',
  templateUrl: './store-header.component.html',
  styleUrls: ['./store-header.component.scss']
})
export class StoreHeaderComponent implements OnInit,OnDestroy {
  cart: Cart;
  user:User;
  categories:Category[]=[];
  categoriesToFilter:Category[]=[];
  categoriesToShow:Category[]=[];
  showAllCategories=false;
  constructor(
    private productService:ProductsService,
    private cartService: CartService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.cartService.loadCart();
    this.cartService.getCart().subscribe(cart=>this.cart=cart);
    this.productService.getCategories().pipe(take(1)).subscribe(categories=>{
      this.categories=categories;
      this.categoriesToShow=this.categories.slice(0,4);
    });
  
  }

  ngOnDestroy(){
    this.cartService.upLoadCart(this.cart).pipe(take(1)).subscribe(cart=>console.log("succes"));
  }

  filterCategory(id:number,selected:boolean){
    if(selected){
      let category=this.categories.find(category=>category.categoryId===id);
      this.categoriesToFilter.push(category);
      this.productService.loadAvailableProductCount(this.categoriesToFilter);
      this.productService.loadProducts(10,0,this.categoriesToFilter);
    }
    else{
      let index=this.categoriesToFilter.findIndex(category=>category.categoryId===id);
      this.categoriesToFilter.splice(index,1);
      if(this.categoriesToFilter.length===0){}
      this.productService.loadAvailableProductCount(this.categoriesToFilter);
      this.productService.loadProducts(10,0,this.categoriesToFilter);
    }
    
  }

  toggleCategoryOptions(){
    this.showAllCategories=!this.showAllCategories;
    if(this.showAllCategories)
      this.categoriesToShow=this.categories;
    else
      this.categoriesToShow=this.categories.slice(0,4);
  }
}

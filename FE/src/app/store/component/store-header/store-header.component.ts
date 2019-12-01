import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../service/cart-service/cart.service';
import { take } from 'rxjs/operators';
import { Cart } from 'src/app/shared/Models/cart';
import { UUID } from 'angular2-uuid';
import { User } from 'src/app/shared/Models/user';
import { AccountService } from 'src/app/shared/services/account-service/account.service';
import { Category } from 'src/app/shared/Models/category';
import { ProductsService } from 'src/app/shared/services/products-service/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'store-header',
  templateUrl: './store-header.component.html',
  styleUrls: ['./store-header.component.scss']
})
export class StoreHeaderComponent implements OnInit{
  cart: Cart;
  user:User;

  categories:Category[]=[];
  categoriesToFilter:Category[]=[];
  categoriesToShow:Category[]=[];

  showAllCategories=false;
  showFilters=false;
  showFilterByCategory=false;
  showFilterByPrice=false;
  showOrderBy=false;

  priceStart:number=0;
  priceEnd:number=1000000;
  isFilterByPriceSet:boolean=false;
  priceFilterForm:FormGroup=new FormGroup({
    lowerLimit: new FormControl(["",Validators.required]),
    upperLimit: new FormControl(["",Validators.required]),
  });

  sort:string[]=['productName','asc'];
  
  constructor(
    private productService:ProductsService,
    private cartService: CartService,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.cartService.loadCart();
    this.cartService.getCart().subscribe(cart=>this.cart=cart);
    this.productService.getCategories().pipe(take(1)).subscribe(categories=>{
      this.categories=categories;
      this.categoriesToShow=this.categories.slice(0,4);
    });
  
  }

  filterCategory(id:number,selected:boolean){
    let prices:number[]=[];
    prices.push(this.priceStart);
    prices.push(this.priceEnd);
    if(selected){
      let category=this.categories.find(category=>category.categoryId===id);
      this.categoriesToFilter.push(category);
      this.productService.loadAvailableProductCount(this.categoriesToFilter,prices);
      this.productService.loadProducts(10,0,this.categoriesToFilter,this.sort,prices);
    }
    else{
      let index=this.categoriesToFilter.findIndex(category=>category.categoryId===id);
      this.categoriesToFilter.splice(index,1);
      if(this.categoriesToFilter.length===0){}
      this.productService.loadAvailableProductCount(this.categoriesToFilter,prices);
      this.productService.loadProducts(10,0,this.categoriesToFilter,this.sort,prices);
    }
    
  }

  toggleCategoryOptions(){
    this.showAllCategories=!this.showAllCategories;
    if(this.showAllCategories)
      this.categoriesToShow=this.categories;
    else
      this.categoriesToShow=this.categories.slice(0,4);
  }
  toggleFilters(){
    this.showFilters=!this.showFilters;
  }

  filterByPrice(){
    this.isFilterByPriceSet=true;
    this.priceStart=parseInt(this.priceFilterForm.get('lowerLimit').value);
    this.priceEnd=parseInt(this.priceFilterForm.get('upperLimit').value);

    this.priceFilterForm.get('lowerLimit').setValue(" ");
    this.priceFilterForm.get('upperLimit').setValue(" ");

    if(this.priceEnd<0 || this.priceStart<0){
      this.snackBar.open("The prices should not be less then 0", "OK",{duration:2000});
    }
    else if(this.priceEnd<this.priceStart){
      this.snackBar.open("The lower limit should always be less then upper limit", "OK",{duration:2000});
    }
    else{
      let prices:number[]=[];
      prices.push(this.priceStart);
      prices.push(this.priceEnd);
      this.productService.loadProducts(10,0,this.categoriesToFilter,this.sort,prices);
      this.productService.loadAvailableProductCount(this.categoriesToFilter,prices);
    }
  }
  clearFilterByPrice(){
    this.isFilterByPriceSet=false;
    this.priceStart=0;
    this.priceEnd=1000000;

    let prices: number[] = [];
    prices.push(this.priceStart);
    prices.push(this.priceEnd);
    this.productService.loadProducts(10, 0, this.categoriesToFilter, this.sort, prices);
    this.productService.loadAvailableProductCount(this.categoriesToFilter, prices);
  }

  sortField(sortField:string){
    this.sort[0]=sortField;

    let prices: number[] = [];
    prices.push(this.priceStart);
    prices.push(this.priceEnd);
    this.productService.loadProducts(10, 0, this.categoriesToFilter, this.sort, prices);
    this.productService.loadAvailableProductCount(this.categoriesToFilter, prices);
  }
  sortDirection(sortDirection:string){
    this.sort[1]=sortDirection;

    let prices: number[] = [];
    prices.push(this.priceStart);
    prices.push(this.priceEnd);
    this.productService.loadProducts(10, 0, this.categoriesToFilter, this.sort, prices);
    this.productService.loadAvailableProductCount(this.categoriesToFilter, prices);
  }
}
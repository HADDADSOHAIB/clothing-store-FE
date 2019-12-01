import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products-service/products.service';
import { Product } from 'src/app/shared/Models/product';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/shared/Models/category';
import { CartService } from 'src/app/store/service/cart-service/cart.service';
import { AccountService } from 'src/app/shared/services/account-service/account.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[]=[];
  availableProductCount: number=0;
  itemsPerPage:number=10;
  currentPage: number=1;
  displayedColumns: string[] = ['ProductName', 'Price','Quantity','Options'];
  sort:string[]=[];
  sortDirection:Map<string,string>=new Map<string,string>();
  selectedSortElement:string='';

  categories:Category[]=[];
  categoriesToFilter:Category[]=[];
  categoriesToShow:Category[]=[];
  showAllCategories=false;
  priceStart:number=0;
  priceEnd:number=1000000;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cartService: CartService,
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.sortDirection.set("productName","asc");
    this.sortDirection.set("price","asc");
    this.sortDirection.set("quantity","asc");

    this.productService.loadProducts(this.itemsPerPage,this.currentPage-1,[],this.sort);
    this.productService.getProducts().subscribe(prods=>this.products=prods);
    this.productService.loadAvailableProductCount();
    this.productService.getAvailableProductCount().subscribe(count=>this.availableProductCount=count);

    this.productService.getCategories().pipe(take(1)).subscribe(categories=>{
      this.categories=categories;
      this.categoriesToShow=this.categories.slice(0,4);
    });
  }

  changeItemsPerPage($event:string){
    this.itemsPerPage=parseInt($event);
    this.currentPage=1;
    this.productService.loadProducts(this.itemsPerPage,0, [], this.sort);
  }

  changePageNumber($event:string){
    this.currentPage=parseInt($event);
    this.productService.loadProducts(this.itemsPerPage,this.currentPage-1, [],this.sort);
  }

  edit(id: string){
    this.router.navigate(["admin/product/"+id]);
  }
  delete(id: number){
    this.productService.deleteProduct(id).pipe(take(1)).subscribe(response=>{
      this.snackBar.open("deleted succesfully", 'OK', {
        duration: 2000,
      });
      this.productService.loadProducts(this.itemsPerPage,this.currentPage);
    },error=>{
      this.snackBar.open("error", 'OK', {
        duration: 2000,
      });
    });
  }

  sortBy(sortElement:string){
    this.displayedColumns.forEach(columnTitle=>{
      if(columnTitle.toLowerCase()===sortElement.toLowerCase()){
        this.sortDirection.get(sortElement)==='asc'?
          this.sortDirection.set(sortElement,'desc'):this.sortDirection.set(sortElement,'asc');
        this.sort=[];
        this.sort.push(sortElement);
        this.sort.push(this.sortDirection.get(sortElement));
        this.currentPage=1;
        this.productService.loadProducts(this.itemsPerPage,0, [], this.sort);
        this.selectedSortElement=sortElement;
      }
    })
  }

  filterCategory(id:number,selected:boolean){
    let prices:number[]=[];
    prices.push(this.priceStart);
    prices.push(this.priceEnd);
    if(selected){
      let category=this.categories.find(category=>category.categoryId===id);
      this.categoriesToFilter.push(category);
      this.productService.loadAvailableProductCount(this.categoriesToFilter,prices);
      this.productService.loadProducts(10,0,this.categoriesToFilter,[],prices);
    }
    else{
      let index=this.categoriesToFilter.findIndex(category=>category.categoryId===id);
      this.categoriesToFilter.splice(index,1);
      if(this.categoriesToFilter.length===0){}
      this.productService.loadAvailableProductCount(this.categoriesToFilter,prices);
      this.productService.loadProducts(10,0,this.categoriesToFilter,[],prices);
    }
    
  }

  toggleCategoryOptions(){
    this.showAllCategories=!this.showAllCategories;
    if(this.showAllCategories)
      this.categoriesToShow=this.categories;
    else
      this.categoriesToShow=this.categories.slice(0,4);
  }

  filterByPrice(){
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
      this.productService.loadProducts(10,0,this.categoriesToFilter,[],prices);
      this.productService.loadAvailableProductCount(this.categoriesToFilter,prices);
    }
  }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products-service/products.service';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category-service/category.service';

@Component({
  selector: 'app-store-front',
  templateUrl: './store-front.component.html',
  styleUrls: ['./store-front.component.scss']
})
export class StoreFrontComponent implements OnInit, OnDestroy {
  
  availableProductCount: number;
  products:Product[]=[];
  itemsPerPage:number=10;
  currentPage: number=1;
  filterAndSortOptions:{prices:number[],sort:string[],categoryList:number[]}={prices:[],sort:[],categoryList:[]};
  categories:Category[]=[];
  isFiltersSet:boolean=false;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private categoryService:CategoryService
    ) { }

  ngOnInit() {
    this.productsService.loadAvailableProductCount();
    this.productsService.getAvailableProductCount().subscribe(count=>this.availableProductCount=count);
    this.getProducts(this.itemsPerPage, this.currentPage);
    this.productsService.getProducts().subscribe(products => this.products = products);
    this.categoryService.getCategories().pipe(take(1)).subscribe(categories=>this.categories=categories);
    this.productsService.optionSubject.subscribe(options=>{
      this.filterAndSortOptions=options;
      if(options.prices[0]!=0 || options.prices[1]!=1000000 || options.sort[0]!="productName" 
      || options.sort[1]!="asc" || options.categoryList.length!=0)
        this.isFiltersSet=true;
      else
        this.isFiltersSet=false;

      console.log(options);
    });
  }

  changeItemsPerPage($event){
    this.itemsPerPage=$event;
    this.currentPage=1;
    this.productsService.loadAvailableProductCount();
    this.getProducts(this.itemsPerPage, this.currentPage);
  }

  changePageNumber($event){
    this.currentPage=$event;
    this.getProducts(this.itemsPerPage, this.currentPage);
  }
  
  private getProducts(itemsPerPage: number,pageNumber: number) {
    this.productsService.loadProducts(itemsPerPage,pageNumber-1);
  }

  findCategoryById(id:number){
    return this.categories.find(category=>category.categoryId===id);
  }
  ngOnDestroy(){
    
  }
}
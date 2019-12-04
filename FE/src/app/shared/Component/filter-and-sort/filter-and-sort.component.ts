import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../Models/category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products-service/products.service';
import { CartService } from 'src/app/store/service/cart-service/cart.service';
import { AccountService } from '../../services/account-service/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { CategoryService } from 'src/app/admin/service/category-service/category.service';

@Component({
  selector: 'filter-and-sort',
  templateUrl: './filter-and-sort.component.html',
  styleUrls: ['./filter-and-sort.component.scss']
})
export class FilterAndSortComponent implements OnInit {
  @Input() selectedCategory:number=0;

  categories:Category[]=[];
  categoriesToFilter:number[]=[];
  categoriesToShow:Category[]=[];

  showAllCategories=false;
  showFilters=false;
  showFilterByCategory=false;
  showFilterByPrice=false;
  showSortBy=false;
  showSearch=true;

  priceStart:number=0;
  priceEnd:number=1000000;
  isFilterByPriceSet:boolean=false;
  priceFilterForm:FormGroup=new FormGroup({
    lowerLimit: new FormControl(["",Validators.required]),
    upperLimit: new FormControl(["",Validators.required]),
  });

  sort:string[]=['productName','asc'];
  searchQuery:string="";
  selectedSearchQuery:string="";
  isQuerySearchSet=false;
  
  constructor(
    private productService:ProductsService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar) { 
  }

  ngOnInit() {
    this.categoryService.getCategories().pipe(take(1)).subscribe(categories=>{
      this.categories=categories;
      this.categoriesToShow=this.categories.slice(0,4);
      if(this.selectedCategory!==0){
        let category=this.categories.find(category=>category.categoryId===this.selectedCategory);
        this.categoriesToFilter.push(category.categoryId);
        this.updateFilterAndSortOptions();
        this.productService.loadAvailableProductCount();
        this.productService.loadProducts(10,0);

        this.showFilters=true;
        this.showFilterByCategory=true;
        this.showAllCategories=true;
        this.categoriesToShow=this.categories;
      }
    });
  }

  filterCategory(id:number,selected:boolean){
    
    if(selected){
      let category=this.categories.find(category=>category.categoryId===id);
      this.categoriesToFilter.push(category.categoryId);
      this.updateFilterAndSortOptions();
      this.productService.loadAvailableProductCount();
      this.productService.loadProducts(10,0);

    }
    else{
      let index=this.categoriesToFilter.findIndex(categoryId=>categoryId===id);
      this.categoriesToFilter.splice(index,1);
      if(this.categoriesToFilter.length===0){}
      this.updateFilterAndSortOptions();
      this.productService.loadAvailableProductCount();
      this.productService.loadProducts(10,0);
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
  toggleFilterByCategory(){
    this.showFilterByCategory=!this.showFilterByCategory;
  }
  toggleFilterByPrice(){
    this.showFilterByPrice=!this.showFilterByPrice;
  }
  toggleSortBy(){
    this.showSortBy=!this.showSortBy;
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
      this.updateFilterAndSortOptions();
      this.productService.loadProducts(10,0);
      this.productService.loadAvailableProductCount();
    }
  }
  clearFilterByPrice(){
    this.isFilterByPriceSet=false;
    this.priceStart=0;
    this.priceEnd=1000000;

    this.updateFilterAndSortOptions();
    this.productService.loadProducts(10, 0);
    this.productService.loadAvailableProductCount();
  }

  sortField(sortField:string){
    this.sort[0]=sortField;
    this.updateFilterAndSortOptions();
    this.productService.loadProducts(10, 0);
    this.productService.loadAvailableProductCount();
  }
  sortDirection(sortDirection:string){
    this.sort[1]=sortDirection;
    this.updateFilterAndSortOptions();
    this.productService.loadProducts(10, 0);
    this.productService.loadAvailableProductCount();
  }
  private updateFilterAndSortOptions(){
    this.productService.optionSubject.next({
      prices:[this.priceStart,this.priceEnd],
      sort:this.sort,
      categoryList:this.categoriesToFilter
    });
  }


  toggleSearch(){
    this.showSearch=!this.showSearch;
  }

  search(){
    this.productService.searchSubject.next(this.searchQuery);
    this.productService.loadAvailableProductCount();
    this.productService.loadProducts(10,0);
    this.selectedSearchQuery=this.searchQuery;
    this.isQuerySearchSet=true;
    this.searchQuery="";
  }
  clearSearch(){
    this.selectedSearchQuery="";
    this.isQuerySearchSet=false;
    this.productService.searchSubject.next(this.searchQuery);
    this.productService.loadAvailableProductCount();
    this.productService.loadProducts(10,0);
  }

}

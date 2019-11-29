import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products-service/products.service';
import { Product } from 'src/app/shared/Models/product';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private productService: ProductsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.sortDirection.set("productName","asc");
    this.sortDirection.set("price","asc");
    this.sortDirection.set("quantity","asc");

    this.productService.loadProducts(this.itemsPerPage,this.currentPage-1,[],this.sort);
    this.productService.getProducts().subscribe(prods=>this.products=prods);
    this.productService.loadAvailableProductCount();
    this.productService.getAvailableProductCount().subscribe(count=>this.availableProductCount=count);
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
      }
    })
  }
}
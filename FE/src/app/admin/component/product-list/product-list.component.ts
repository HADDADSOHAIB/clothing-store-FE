import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products-service/products.service';
import { Product } from 'src/app/shared/Models/product';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[]=[];
  availableProductCount: number;
  itemsPerPage:number=20;
  currentPage: number=1;
  displayedColumns: string[] = ['ProductName', 'Price','Quantity','Options'];

  constructor(
    private productService: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productService.getAvailableProductCount().pipe(take(1)).subscribe(count=>this.availableProductCount=count);
    this.productService.loadProducts(this.itemsPerPage,this.currentPage);
    this.productService.getProducts().subscribe(prods=>{
      this.products=[];
      prods.forEach(prod=>this.products.push(prod));
    });
  }

  changeItemsPerPage($event:string){
    this.currentPage=Math.trunc((this.itemsPerPage/parseInt($event))*this.currentPage);
    this.itemsPerPage=parseInt($event);
  }

  changePageNumber($event:string){
    this.currentPage=parseInt($event);
    this.productService.loadProducts(this.itemsPerPage,this.currentPage);
  }

  edit(id: string){
    this.router.navigate(["admin/product/"+id]);
  }
  delete(id: number){
    this.productService.deleteProduct(id);
  }
  goProductForm(){
    this.router.navigate(["/admin/product/new"])
  }
}

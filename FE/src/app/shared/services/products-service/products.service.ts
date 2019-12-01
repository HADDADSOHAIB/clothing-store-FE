import { Injectable } from '@angular/core';
import { Product } from '../../Models/product';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BACK_END } from 'backend';
import { take, switchMap } from 'rxjs/operators'
import { Category } from '../../Models/category';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productSubjects:BehaviorSubject<Product[]>=new BehaviorSubject([]);
  productCountSubject:BehaviorSubject<number>=new BehaviorSubject(0);

  optionSubject:BehaviorSubject<{prices:number[],sort:string[],categoryList:number[]}>
    =new BehaviorSubject({ prices:[0,1000000],sort:['productName','asc'],categoryList:[]});
  
  constructor(private httpClient:HttpClient) {
    console.log(this.optionSubject);
  }

  getAvailableProductCount() {
    return this.productCountSubject;
  }

  async loadAvailableProductCount() {
    let options=await this.optionSubject.toPromise();
    
    let requestPrice=options.prices.join(",");
    if(options.categoryList.length!==0){
    let request=options.categoryList.join(",");
    (this.httpClient.get(BACK_END+"productscount?categories="+request+"&&prices="+requestPrice) as Observable<number>)
    .pipe(take(1)).subscribe(count=>this.productCountSubject.next(count));
    }
    else
    (this.httpClient.get(BACK_END+"productscount?"+"prices="+requestPrice) as Observable<number>)
    .pipe(take(1)).subscribe(count=>this.productCountSubject.next(count));
  }

  async loadProducts(itemsPerPage: number,pageNumber: number) {
    let options=await this.optionSubject.toPromise();
    console.log(options);
    let requestPrice=options.prices.join(",");
    if(options.categoryList.length!==0 && options.sort.length!==0){
      let requestCategory=options.categoryList.join(",");
      let requestSort=options.sort.join(",");
      (this.httpClient.get(BACK_END+"productspaged?page="+pageNumber+"&&size="
        +itemsPerPage+"&&categories="+requestCategory+"&&sort="+requestSort+"&&prices="+requestPrice) as Observable<Product[]>)
        .pipe(take(1)).subscribe(productList=>this.productSubjects.next(productList));
    }
    else if(options.sort.length!==0 && options.categoryList.length===0){
      let requestSort=options.sort.join(",");
      (this.httpClient.get(BACK_END+"productspaged?page="+pageNumber+"&&size="
        +itemsPerPage+"&&sort="+requestSort+"&&prices="+requestPrice) as Observable<Product[]>)
        .pipe(take(1)).subscribe(productList=>this.productSubjects.next(productList));
    }
    else if(options.categoryList.length!==0 && options.sort.length===0){
      let requestCategory=options.categoryList.join(",");
      (this.httpClient.get(BACK_END+"productspaged?page="+pageNumber+"&&size="
        +itemsPerPage+"&&categories="+requestCategory+"&&prices="+requestPrice) as Observable<Product[]>)
        .pipe(take(1)).subscribe(productList=>this.productSubjects.next(productList));
    }
    else
    (this.httpClient.get(BACK_END+"productspaged?page="+pageNumber+"&&size="+itemsPerPage
      +"&&prices="+requestPrice) as Observable<Product[]>).pipe(take(1))
      .subscribe(productList=>this.productSubjects.next(productList));
  }

  getProducts(){
    return this.productSubjects;
  }

  getProduct(id: number) {
    return this.httpClient.get(BACK_END+"products/"+id) as Observable<Product>;
  }

  addProduct(product:Product){
    return this.httpClient.post(BACK_END+"products",product) as Observable<Product>;
  }
  deleteProduct(id: number) {
    return this.httpClient.delete(BACK_END+"products/"+id) as Observable<Product>;
  }
  updateProduct(product:Product){
    return this.httpClient.put(BACK_END+"products/"+product.productId,product) as Observable<Product>;
  }
}

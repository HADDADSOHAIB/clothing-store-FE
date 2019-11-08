import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/Operators';
import { Product } from '../../Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  
  //Mock for call to the backend to load products
  productsDb:Product[]=[
    new Product().setProductId(1).setProductName('Cheese').setCategoryName('Dairy')
    .setCategoryId(1).setPrice(15).setDescription('Best cheese')
    .setImage("https://www.kaaskamer.nl/wp-content/uploads/2019/01/kaaskamer_van_"
      +"amsterdam_70_boerenkaas_pakket-1.jpg"),
    new Product().setProductId(2).setProductName('Milk').setCategoryName('Dairy')
    .setCategoryId(1).setPrice(8).setDescription('Best milk')
    .setImage("https://article.images.consumerreports.org/f_auto/prod/content/dam/"
    +"CRO%20Images%202019/Health/06June/CR-Health-Inlinehero-a2-milk-0619"),
    new Product().setProductId(3).setProductName('Yogarut').setCategoryName('Dairy')
    .setCategoryId(1).setPrice(5).setDescription('Best Yogurut')
    .setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsv8vseT1LhY0kycx"
    +"Aw7jJbBe2g24p-NUS13o3teR7YchuFhAWFg&s"),
    new Product().setProductId(4).setProductName('Cheese').setCategoryName('Dairy')
    .setCategoryId(1).setPrice(15).setDescription('Best cheese')
    .setImage("https://www.kaaskamer.nl/wp-content/uploads/2019/01/kaaskamer_van_"
      +"amsterdam_70_boerenkaas_pakket-1.jpg"),
    new Product().setProductId(5).setProductName('Milk').setCategoryName('Dairy')
    .setCategoryId(1).setPrice(8).setDescription('Best milk')
    .setImage("https://article.images.consumerreports.org/f_auto/prod/content/dam/"
    +"CRO%20Images%202019/Health/06June/CR-Health-Inlinehero-a2-milk-0619"),
    new Product().setProductId(6).setProductName('Yogarut').setCategoryName('Dairy')
    .setCategoryId(1).setPrice(5).setDescription('Best Yogurut')
    .setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsv8vseT1LhY0kycx"
    +"Aw7jJbBe2g24p-NUS13o3teR7YchuFhAWFg&s"),
    new Product().setProductId(7).setProductName('Cheese').setCategoryName('Dairy')
    .setCategoryId(1).setPrice(15).setDescription('Best cheese')
    .setImage("https://www.kaaskamer.nl/wp-content/uploads/2019/01/kaaskamer_van_"
      +"amsterdam_70_boerenkaas_pakket-1.jpg"),
    new Product().setProductId(8).setProductName('Milk').setCategoryName('Dairy')
    .setCategoryId(1).setPrice(8).setDescription('Best milk')
    .setImage("https://article.images.consumerreports.org/f_auto/prod/content/dam/"
    +"CRO%20Images%202019/Health/06June/CR-Health-Inlinehero-a2-milk-0619"),
    new Product().setProductId(9).setProductName('Yogarut').setCategoryName('Dairy')
    .setCategoryId(1).setPrice(5).setDescription('Best Yogurut')
    .setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsv8vseT1LhY0kycx"
    +"Aw7jJbBe2g24p-NUS13o3teR7YchuFhAWFg&s")
  ];
  productDbSubject:BehaviorSubject<Product[]>=new BehaviorSubject(this.productsDb);

  //Mock for call to the backend to load availableProductCount
  productCountSubject:BehaviorSubject<number>=new BehaviorSubject(this.productsDb.length);
  //end of Mock field

  //after retrieving the product from db, the subject distribute them.
  productSubject:BehaviorSubject<Product[]>=new BehaviorSubject([]);

  constructor() {}

  loadProducts(itemsPerPage: number,pageNumber: number) {
    //return this.httpClient.get("") as Observable<Product[]>;
    this.productDbSubject.pipe(map(products=>products.slice((pageNumber-1)*itemsPerPage,pageNumber*itemsPerPage)))
    .pipe(take(1)).subscribe(prods=>this.productSubject.next(prods));
  }

  getProducts(){
    return this.productSubject;
  }

  getAvailableProductCount() {
    //return this.httpClient.get("") as Observable<number>;
    return this.productCountSubject;
  }

  get(id: number) {
    return this.productDbSubject.pipe(map(prods=>prods.find(prod=>prod.productId===id)),take(1));
  }

  update(product: Product) {
    let index=this.productsDb.findIndex(prod=>prod.productId===product.productId);
    this.productsDb[index]=product;
    this.productDbSubject.next(this.productsDb);
  }
  add(product: Product) {
    this.productsDb.push(product);
    this.productDbSubject.next(this.productsDb);
  }
  delete(id: number) {
    let index=this.productsDb.findIndex(prod=>prod.productId===id);
    this.productsDb.splice(index,1);
    this.productDbSubject.next(this.productsDb);
  }
}

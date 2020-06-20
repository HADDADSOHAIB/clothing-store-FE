import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product-service/product.service';
import { Options } from 'src/app/models/options';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  products$: BehaviorSubject<Product[]> = new BehaviorSubject([]);

  constructor(
    private productService: ProductService,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productService.options.subscribe((opt) => this.loadProducts());
  }

  private loadProducts() {
    this.productService
      .getProducts()
      .pipe(take(1))
      .subscribe((res) => {
        this.products = res;
        this.products$.next(this.products);
      });
  }

  edit(product: Product) {
    this.router.navigate(['admin/product/', product.id]);
  }
}

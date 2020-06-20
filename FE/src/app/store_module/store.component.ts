import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidenavService } from '../services/sidenav-service/sidenav.service';
import { ProductService } from '../services/product-service/product.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Product } from '../models/product';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit, OnDestroy {
  products$: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  s: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.s = this.productService.getProducts().subscribe((products) => this.products$.next(products));
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }
}

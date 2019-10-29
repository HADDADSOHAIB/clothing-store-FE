import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../model/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;

  constructor() {
    this.product
   }

  ngOnInit() {
  }

}

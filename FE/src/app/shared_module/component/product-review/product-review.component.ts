import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ProductReview } from 'src/app/models/product-review';
import { User } from 'src/app/models/user';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.scss'],
})
export class ProductReviewComponent implements OnInit {
  @Input() review: ProductReview;
  @Input() profil: Boolean = false;
  user: User;
  product: Product;

  constructor() {}

  ngOnInit() {
    this.user = this.review['user'];
    this.product = this.review['product'];
  }
}

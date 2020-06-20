import { Component, OnInit, Input } from '@angular/core';
import { ProductReview } from 'src/app/models/product-review';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.scss'],
})
export class ProductReviewComponent implements OnInit {
  @Input() review: ProductReview;
  @Input() profil: Boolean = false;
  user: User;

  constructor() {}

  ngOnInit() {
    this.user = this.review['user'];
    console.log(this.review);
  }
}

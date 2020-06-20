import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ProductService } from 'src/app/services/product-service/product.service';
import { take } from 'rxjs/operators';
import { Options } from 'src/app/models/options';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  pagesList: number[] = [];

  count: number = 0;
  current: number = 1;
  size: string = '10';
  options: Options;

  constructor(public productService: ProductService) {}

  ngOnInit() {
    this.productService
      .getCount()
      .pipe(take(1))
      .subscribe((res) => {
        this.count = res.data.count;
        this.setPageList();
      });

    this.productService.options.subscribe((opt) => {
      this.current = opt.page;
      this.size = `${opt.size}`;
      this.options = opt;
    });
  }

  setPageList() {
    this.pagesList = [];
    for (let i = 1; i <= Math.ceil(this.count / parseInt(this.size)); i++) {
      this.pagesList.push(i);
    }
  }

  changeSize(e) {
    this.size = e.value;
    this.options.page = 1;
    this.options.size = parseInt(this.size);
    this.productService.options.next(this.options);
    this.setPageList();
  }

  changePageNumber(e) {
    this.current = parseInt(e.value);
    this.options.page = this.current;
    this.productService.options.next(this.options);
  }

  firstPage() {
    this.options.page = 1;
    this.productService.options.next(this.options);
  }

  beforePage() {
    if (this.current !== 1) {
      this.current -= 1;
      this.options.page = this.current;
      this.productService.options.next(this.options);
    }
  }

  nextPage() {
    if (this.current !== this.pagesList[this.pagesList.length - 1]) {
      this.current += 1;
      this.options.page = this.current;
      this.productService.options.next(this.options);
    }
  }

  lastPage() {
    this.current = this.pagesList[this.pagesList.length - 1];
    this.options.page = this.current;
    this.productService.options.next(this.options);
  }
}

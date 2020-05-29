import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { ProductService } from 'src/app/services/product-service/product.service';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { Options } from 'src/app/models/options';

@Component({
  selector: 'filter-and-sort',
  templateUrl: './filter-and-sort.component.html',
  styleUrls: ['./filter-and-sort.component.scss'],
})
export class FilterAndSortComponent implements OnInit {
  
  showFilters = false;
  categories: Category[] = [];
  showSortBy = false;
  priceFilterForm: FormGroup;
  sortByForm: FormGroup;
  options: Options = new Options('', [0, Infinity], ['name', 'asc'], []);

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.priceFilterForm = this.formBuilder.group({
      lowerPrice: [0],
      upperPrice: [Infinity],
    });

    this.sortByForm = this.formBuilder.group({
      order: ['name'],
      dir: ['asc'],
    });

    this.categoryService
      .getCategories()
      .pipe(take(1))
      .subscribe((res) => (this.categories = res.categories));

    this.productService.options.next(this.options);
  }

  search() {
    this.productService.options.next(this.options);
    this.options.searchQuery = '';
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  selectCategroy($event) {
    if(!this.options.categoryList.includes(parseInt($event.value))){
      this.options.categoryList.push(parseInt($event.value));
      this.productService.options.next(this.options);
    }
  }

  filterByPrice() {
   const { lowerPrice, upperPrice } = this.priceFilterForm.value;
   this.options.prices = [lowerPrice, upperPrice],
   this.productService.options.next(this.options);
  }

  toggleSortBy() {
    this.showSortBy = !this.showSortBy;
  }

  sortField(e) {
    this.options.sort[0] = e.value;
    this.productService.options.next(this.options);
  }

  sortDirection(e) {
    this.options.sort[1] = e.value;
    this.productService.options.next(this.options);
  }
}

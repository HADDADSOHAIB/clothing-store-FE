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
  options: Options = new Options('', [0, Infinity], ['', ''], [], 1, 10);
  searchQuery = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.priceFilterForm = this.formBuilder.group({
      lowerPrice: [null],
      upperPrice: [null],
    });

    this.sortByForm = this.formBuilder.group({
      order: [''],
      dir: [''],
    });

    this.categoryService
      .getCategories()
      .pipe(take(1))
      .subscribe((res) => (this.categories = res.categories));

    this.productService.options.subscribe((options) => (this.options = options));
  }

  search() {
    if (this.searchQuery.trim()) {
      this.options.searchQuery = this.searchQuery;
      this.productService.options.next(this.options);
    }
    this.searchQuery = '';
  }

  clearSearch() {
    this.options.searchQuery = '';
    this.productService.options.next(this.options);
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  selectCategroy($event) {
    if (!this.options.categoryList.includes(parseInt($event.value))) {
      this.options.categoryList.push(parseInt($event.value));
      this.productService.options.next(this.options);
    }
  }

  removeCategory(id) {
    const index = this.options.categoryList.findIndex((cat) => cat === id);
    if (index !== -1) {
      this.options.categoryList.splice(index, 1);
      this.productService.options.next(this.options);
    }
  }

  filterByPrice() {
    const { lowerPrice, upperPrice } = this.priceFilterForm.value;
    if (lowerPrice) this.options.prices[0] = lowerPrice;
    if (upperPrice) this.options.prices[1] = upperPrice;
    this.productService.options.next(this.options);
    this.priceFilterForm.reset();
  }

  removeMinPrice() {
    this.options.prices[0] = 0;
    this.productService.options.next(this.options);
  }

  removeMaxPrice() {
    this.options.prices[1] = Infinity;
    this.productService.options.next(this.options);
  }

  showMaxPrice() {
    return this.options.prices[1] !== Infinity;
  }

  toggleSortBy() {
    this.showSortBy = !this.showSortBy;
  }

  sortField(e) {
    this.options.sort[0] = e.value;
    if (this.options.sort[1] === '') this.options.sort[1] = 'asc';
    this.productService.options.next(this.options);
  }

  sortDirection(e) {
    this.options.sort[1] = e.value;
    if (this.options.sort[0] === '') this.options.sort[0] = 'name';
    this.productService.options.next(this.options);
  }

  clearSort() {
    this.options.sort = ['', ''];
    this.productService.options.next(this.options);
    this.sortByForm.reset();
  }

  selectCategoryName(id) {
    return this.categories.find((category) => category.id === id).name;
  }

  showSelectedOption() {
    const { categoryList, prices, sort, searchQuery } = this.options;
    return categoryList.length || prices[0] || prices[1] !== Infinity || sort[1] || sort[0] || searchQuery;
  }
}

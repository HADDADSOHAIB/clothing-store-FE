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
  @Input() selectedCategory = 0;

  isFilterByPriceSet = false;
  selectedSearchQuery = '';
  isQuerySearchSet = false;
  options: Options = new Options([0, 1000000], ['productName', 'asc'], []);

  searchQuery = '';
  showFilters = false;
  categories: Category[] = [];
  priceLimits = { lowerPrice: 0, upperPrice: Infinity };
  showSortBy = false;
  priceFilterForm: FormGroup;
  sortByForm: FormGroup;

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

    // this.productService.optionSubject.subscribe((options) => (this.options = options));
  }

  search() {
    console.log(this.searchQuery);
    this.searchQuery = '';
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  selectCategroy($event) {
    console.log($event);
  }

  filterByPrice() {
    this.priceLimits = this.priceFilterForm.value;
    this.priceFilterForm.reset({
      lowerPrice: 0,
      upperPrice: Infinity,
    });
  }

  toggleSortBy() {
    this.showSortBy = !this.showSortBy;
  }

  sortField(e) {
    console.log(e);
  }
  sortDirection(e) {
    console.log(e);
  }

  // clearFilterByPrice() {
  //   this.isFilterByPriceSet = false;
  //   this.options.prices[0] = 0;
  //   this.options.prices[1] = 1000000;

  //   this.updateFilterAndSortOptions();
  //   this.productService.loadProducts(10, 0);
  //   this.productService.loadAvailableProductCount();
  //   this.productService.resetPageNumber.next(1);
  // }

  // private updateFilterAndSortOptions() {
  //   this.productService.optionSubject.next(this.options);
  // }

  // toggleSearch() {
  //   this.showSearch = !this.showSearch;
  // }
  // clearSearch() {
  //   this.selectedSearchQuery = '';
  //   this.isQuerySearchSet = false;
  //   this.productService.searchSubject.next(this.searchQuery);
  //   this.productService.loadAvailableProductCount();
  //   this.productService.loadProducts(10, 0);
  //   this.productService.resetPageNumber.next(1);
  // }
}

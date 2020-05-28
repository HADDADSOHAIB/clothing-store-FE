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

  showFilters = true;
  categories: Category[] = [];
  selectedCatgories: Category[] = [];
  priceLimits = { lowerPrice: 0, upperPrice: Infinity };
  showSortBy = true;
  priceFilterForm: FormGroup;
  sortByForm: FormGroup;

  queryParams = {
    searchQuery: '',
  };

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

    this.productService.queryParams$.next({
      page: 1,
      size: 10,
      ...this.sortByForm.value,
    });

    this.productService.queryParams$.subscribe((res) => {
      this.queryParams = res;
      console.log(this.queryParams);
    });
  }

  search() {
    console.log(this.queryParams.searchQuery);
    this.queryParams = {
      ...this.queryParams,
      searchQuery: '',
    };
    this.productService.queryParams$.next(this.queryParams);
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
    this.productService.queryParams$.next({});
    console.log(this.sortByForm);
  }

  sortDirection(e) {
    console.log(e);
    console.log(this.sortByForm);
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

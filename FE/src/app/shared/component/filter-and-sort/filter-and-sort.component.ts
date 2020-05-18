import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { ProductsService } from 'src/app/services/products-service/products.service';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { Options } from 'src/app/models/options';

@Component({
	selector: 'filter-and-sort',
	templateUrl: './filter-and-sort.component.html',
	styleUrls: ['./filter-and-sort.component.scss']
})
export class FilterAndSortComponent implements OnInit {
	@Input() selectedCategory = 0;

	categories: Category[] = [];
	categoriesToShow: Category[] = [];

	showAllCategories = false;
	showFilters = false;
	showFilterByCategory = false;
	showFilterByPrice = false;
	showSortBy = false;
	showSearch = true;


	isFilterByPriceSet = false;
	priceFilterForm: FormGroup;

	searchQuery = '';
	selectedSearchQuery = '';
	isQuerySearchSet = false;

	options: Options = new Options([0, 1000000], ['productName', 'asc'], []);

	constructor(
		private productService: ProductsService,
		private categoryService: CategoryService,
		private snackBar: MatSnackBar,
		private formBuilder: FormBuilder
		) {
	}

	ngOnInit() {
		this.priceFilterForm = this.formBuilder.group({
			lowerLimit: [''],
			upperLimit: ['']
		});

		this.categoryService.getCategories().pipe(take(1)).subscribe(categories => {
			this.categories = categories;
			this.categoriesToShow = this.categories.slice(0, 4);
			if (this.selectedCategory !== 0) {
				const category = this.categories.find(category => category.categoryId === this.selectedCategory);
				this.options.categoryList.push(category.categoryId);
				this.updateFilterAndSortOptions();
				this.productService.loadAvailableProductCount();
				this.productService.loadProducts(10, 0);

				this.showFilters = true;
				this.showFilterByCategory = true;
				this.showAllCategories = true;
				this.categoriesToShow = this.categories;
			}
		});

		this.productService.optionSubject.subscribe(options => this.options = options);
	}

	filterCategory(id: number, selected: boolean) {

		if (selected) {
			const category = this.categories.find(category => category.categoryId === id);
			this.options.categoryList.push(category.categoryId);

			this.updateFilterAndSortOptions();
			this.productService.loadAvailableProductCount();
			this.productService.loadProducts(10, 0);
			this.productService.resetPageNumber.next(1);
		} else {
			const index = this.options.categoryList.findIndex(categoryId => categoryId === id);
			this.options.categoryList.splice(index, 1);
			if (this.options.categoryList.length === 0) {}
			this.updateFilterAndSortOptions();
			this.productService.loadAvailableProductCount();
			this.productService.loadProducts(10, 0);
			this.productService.resetPageNumber.next(1);
		}

	}

	toggleCategoryOptions() {
		this.showAllCategories = !this.showAllCategories;
		if (this.showAllCategories) {
			this.categoriesToShow = this.categories;
		} else {
			this.categoriesToShow = this.categories.slice(0, 4);
		}
	}
	toggleFilters() {
		this.showFilters = !this.showFilters;
	}
	toggleFilterByCategory() {
		this.showFilterByCategory = !this.showFilterByCategory;
	}
	toggleFilterByPrice() {
		this.showFilterByPrice = !this.showFilterByPrice;
	}
	toggleSortBy() {
		this.showSortBy = !this.showSortBy;
	}

	filterByPrice() {
		this.isFilterByPriceSet = true;


		if (this.priceFilterForm.get('lowerLimit').value !== '') {
		this.options.prices[0] = parseInt(this.priceFilterForm.get('lowerLimit').value);
		}
		if (this.priceFilterForm.get('upperLimit').value !== '') {
		this.options.prices[1] = parseInt(this.priceFilterForm.get('upperLimit').value);
		}

		if (this.options.prices[1] < 0 || this.options.prices[0] < 0) {
			this.snackBar.open('The prices should not be less then 0', 'OK', {duration: 2000});
		} else if (this.options.prices[1] < this.options.prices[0]) {
			this.snackBar.open('The lower limit should always be less then upper limit', 'OK', {duration: 2000});
		} else {
			this.updateFilterAndSortOptions();
			this.productService.loadProducts(10, 0);
			this.productService.loadAvailableProductCount();
			this.productService.resetPageNumber.next(1);
			this.priceFilterForm.get('lowerLimit').setValue('');
			this.priceFilterForm.get('upperLimit').setValue('');
		}
	}
	clearFilterByPrice() {
		this.isFilterByPriceSet = false;
		this.options.prices[0] = 0;
		this.options.prices[1] = 1000000;

		this.updateFilterAndSortOptions();
		this.productService.loadProducts(10, 0);
		this.productService.loadAvailableProductCount();
		this.productService.resetPageNumber.next(1);
	}

	sortField(sortField: string) {
		this.options.sort[0] = sortField;
		this.updateFilterAndSortOptions();
		this.productService.loadProducts(10, 0);
		this.productService.loadAvailableProductCount();
		this.productService.resetPageNumber.next(1);
	}
	sortDirection(sortDirection: string) {
		this.options.sort[1] = sortDirection;
		this.updateFilterAndSortOptions();
		this.productService.loadProducts(10, 0);
		this.productService.loadAvailableProductCount();
		this.productService.resetPageNumber.next(1);
	}
	private updateFilterAndSortOptions() {
		this.productService.optionSubject.next(this.options);
	}

	toggleSearch() {
		this.showSearch = !this.showSearch;
	}

	search() {
		this.productService.searchSubject.next(this.searchQuery);
		this.productService.loadAvailableProductCount();
		this.productService.loadProducts(10, 0);
		this.productService.resetPageNumber.next(1);
		this.selectedSearchQuery = this.searchQuery;
		this.isQuerySearchSet = true;
		this.searchQuery = '';
	}
	clearSearch() {
		this.selectedSearchQuery = '';
		this.isQuerySearchSet = false;
		this.productService.searchSubject.next(this.searchQuery);
		this.productService.loadAvailableProductCount();
		this.productService.loadProducts(10, 0);
		this.productService.resetPageNumber.next(1);
	}

}

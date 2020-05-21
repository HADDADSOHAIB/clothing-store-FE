import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products-service/products.service';
import { Options } from 'src/app/models/options';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
	options: Options = new Options([0, 1000000], ['productName', 'asc'], []);
	products: Product[] = [];
	availableProductCount = 0;
	itemsPerPage = 10;
	currentPage = 1;
	displayedColumns: string[] = ['ProductName', 'Price', 'Quantity', 'Options'];
	sort: string[] = [];
	sortDirection: Map<string, string> = new Map<string, string>();
	selectedSortElement = '';
	selectedCategory = 0;

	constructor(
		private productService: ProductsService,
		private router: Router,
		private snackBar: MatSnackBar,
		private activatedRoute: ActivatedRoute
	) { }

	ngOnInit() {
		this.sortDirection.set('productName', 'asc');
		this.sortDirection.set('price', 'asc');
		this.sortDirection.set('quantity', 'asc');

		this.productService.optionSubject.next(this.options);
		this.productService.loadProducts(this.itemsPerPage, this.currentPage - 1);

		this.productService.getProducts().subscribe(prods => this.products = prods);
		this.productService.loadAvailableProductCount();
		this.productService.getAvailableProductCount().subscribe(count => this.availableProductCount = count);
		this.activatedRoute.queryParamMap.pipe(take(1)).subscribe(queryParams => {
			if (queryParams.get('categoryId')) {
				this.selectedCategory = parseInt(queryParams.get('categoryId'));
			}
		});
	}

	changeItemsPerPage($event: string) {
		this.itemsPerPage = parseInt($event);
		this.currentPage = 1;
		this.productService.loadProducts(this.itemsPerPage, 0);
	}

	changePageNumber($event: string) {
		this.currentPage = parseInt($event);
		this.productService.loadProducts(this.itemsPerPage, this.currentPage - 1);
	}

	edit(id: string) {
		this.router.navigate(['admin/product/' + id]);
	}
	delete(id: number) {
		this.productService.deleteProduct(id).pipe(take(1)).subscribe(response => {
			this.snackBar.open('deleted succesfully', 'OK', {duration: 2000});
			if (this.availableProductCount === 1) {
				this.router.navigate(['admin', 'product', 'new']);
			} else if (this.currentPage === Math.trunc(this.availableProductCount / this.itemsPerPage) + 1 && this.availableProductCount % this.itemsPerPage === 1) {
				this.currentPage = this.currentPage - 1;
				this.productService.resetPageNumber.next(this.currentPage);
				this.productService.loadProducts(this.itemsPerPage, this.currentPage - 1);
				this.productService.loadAvailableProductCount();
			} else {
				this.productService.loadProducts(this.itemsPerPage, this.currentPage - 1);
				this.productService.loadAvailableProductCount();
			}
		}, error => this.snackBar.open('error', 'OK', {duration: 2000}));
	}

	sortBy(sortElement: string) {
		this.displayedColumns.forEach(columnTitle => {
			if (columnTitle.toLowerCase() === sortElement.toLowerCase()) {
				this.sortDirection.get(sortElement) === 'asc' ?
					this.sortDirection.set(sortElement, 'desc') : this.sortDirection.set(sortElement, 'asc');
				this.options.sort = [];
				this.options.sort.push(sortElement);
				this.options.sort.push(this.sortDirection.get(sortElement));
				this.currentPage = 1;
				this.productService.optionSubject.pipe(take(1)).subscribe(options => {
					const newOptions = options;
					newOptions.sort = this.options.sort;
					this.productService.optionSubject.next(newOptions);
					this.productService.loadProducts(this.itemsPerPage, 0);
				});
				this.selectedSortElement = sortElement;
			}
		});
	}


}
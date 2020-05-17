import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BACK_END } from 'backend';
import { take, switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { Options } from 'src/app/models/options';


@Injectable({
	providedIn: 'root'
})
export class ProductsService {
	productSubjects: BehaviorSubject<Product[]> = new BehaviorSubject([]);
	productCountSubject: BehaviorSubject<number> = new BehaviorSubject(0);
	// when I filter the product, I will this subject to push the page to 1
	resetPageNumber: BehaviorSubject<number> = new BehaviorSubject(1);
	optionSubject: BehaviorSubject<Options> = new BehaviorSubject(new Options([0, 1000000], ['productName', 'asc'], []));
	searchQuery = '';
	searchSubject: BehaviorSubject<string> = new BehaviorSubject('');

	constructor(private httpClient: HttpClient) {
	}

	getAvailableProductCount() {
		return this.productCountSubject;
	}

	async loadAvailableProductCount() {
		this.searchSubject.pipe(take(1)).subscribe(searchQuery => {
			this.optionSubject.pipe(take(1)).subscribe(options => {

				this.searchQuery = searchQuery;
				const requestPrice = options.prices.join(',');

				if (options.categoryList.length !== 0) {
				const request = options.categoryList.join(',');

				(this.httpClient.get(BACK_END + 'productscount?categories=' + request + '&&prices=' + requestPrice +
				'&&search=' + this.searchQuery) as Observable<number>).pipe(take(1)).subscribe(count =>
					this.productCountSubject.next(count));
				} else {
				(this.httpClient.get(BACK_END + 'productscount?' + 'prices=' + requestPrice + '&&search=' +
				this.searchQuery) as Observable<number>).pipe(take(1)).subscribe(count =>
					this.productCountSubject.next(count));
				}
			});
		});
	}

	loadProducts(itemsPerPage: number, pageNumber: number) {
		this.searchSubject.pipe(take(1)).subscribe(searchQuery => {
			this.optionSubject.pipe(take(1)).subscribe(options => {

				this.searchQuery = searchQuery;
				const requestPrice = options.prices.join(',');
				const requestSort = options.sort.join(',');

				if (options.categoryList.length !== 0) {
					const requestCategory = options.categoryList.join(',');

					(this.httpClient.get(BACK_END + 'productspaged?page=' + pageNumber + '&&size='
						+ itemsPerPage + '&&categories=' + requestCategory + '&&sort=' + requestSort + '&&prices='
						+ requestPrice + '&&search=' + this.searchQuery) as Observable<Product[]>)
						.pipe(take(1)).subscribe(productList => this.productSubjects.next(productList));
				} else {
					(this.httpClient.get(BACK_END + 'productspaged?page=' + pageNumber + '&&size='
						+ itemsPerPage + '&&sort=' + requestSort + '&&prices=' + requestPrice + '&&search=' +
						this.searchQuery) as Observable<Product[]>).pipe(take(1))
						.subscribe(productList => this.productSubjects.next(productList));
				}
			});
		});

	}

	getProducts() {
		return this.productSubjects;
	}

	getProduct(id: number) {
		return this.httpClient.get(BACK_END + 'products/' + id) as Observable<Product>;
	}

	getProductsByIds(ids: number[]) {
		const productObs: Product[] = [];
		if (ids.length !== 0) {
			return this.httpClient.get(BACK_END + 'products?ids=' + ids.join(',')) as Observable<Product[]>;
		} else {
		return of(productObs);
		}
	}
	addProduct(product: Product) {
		return this.httpClient.post(BACK_END + 'products', product) as Observable<Product>;
	}
	deleteProduct(id: number) {
		return this.httpClient.delete(BACK_END + 'products/' + id) as Observable<Product>;
	}
	updateProduct(product: Product) {
		return this.httpClient.put(BACK_END + 'products/' + product.productId, product) as Observable<Product>;
	}
}

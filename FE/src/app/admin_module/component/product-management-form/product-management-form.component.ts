import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { ProductsService } from 'src/app/services/products-service/products.service';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { UploadFilesService } from 'src/app/services/upload-files-service/upload-files.service';

@Component({
  selector: 'app-product-management-form',
  templateUrl: './product-management-form.component.html',
  styleUrls: ['./product-management-form.component.scss'],
})
export class ProductManagementFormComponent implements OnInit {
  form: FormGroup;
  id = 0;
  product: Product = new Product();
  imageUrls: String[] = [];
  categories: Category[] = [];

  files: File[] = [];
  formData: FormData = new FormData();
  constructor(
    private productService: ProductsService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
    private snackBar: MatSnackBar,
    private fileService: UploadFilesService
  ) {}

  ngOnInit() {
    this.updateForm();

    this.activatedRoute.paramMap.pipe(take(1)).subscribe((param) => {
      if (param.get('id') != 'new') {
        this.id = parseInt(param.get('id'));
        this.loadProduct();
      }
    });

    this.categoryService
      .getCategories()
      .pipe(take(1))
      .subscribe((cats) => (this.categories = cats));
  }

  private loadProduct() {
    this.productService
      .getProduct(this.id)
      .pipe(take(1))
      .subscribe((prod) => {
        this.product = prod;
        this.imageUrls = [];
        this.updateForm();
        this.product.images.forEach((imageId, i) =>
          this.fileService
            .downloadFile(imageId)
            .pipe(take(1))
            .subscribe((reader) =>
              reader.addEventListener(
                'load',
                () => {
                  this.imageUrls = [
                    ...this.imageUrls.slice(0, i),
                    reader.result.toString(),
                    ...this.imageUrls.slice(i + 1),
                  ];
                },
                false
              )
            )
        );
      });
  }

  private updateForm() {
    this.form = this.formBuilder.group({
      name: [this.product.productName],
      description: [this.product.description],
      price: [this.product.price],
      quantity: [this.product.quantity],
      category: [''],
    });
  }
  updateProduct() {
    this.product.productName = this.form.get('name').value;
    this.product.description = this.form.get('description').value;
    this.product.quantity = parseInt(this.form.get('quantity').value);
    this.product.price = parseInt(this.form.get('price').value);
    const categoryId = parseInt(this.form.get('category').value);
    if (categoryId) {
      const category = this.categories.find((category) => category.id === categoryId);
      const index = this.product.categories.findIndex((category) => category.id == categoryId);
      if (index == -1) {
        this.product.categories.push(category);
      }
    }
  }

  removeCategory(categoryId: number) {
    const index = this.product.categories.findIndex((category) => category.id === categoryId);
    this.product.categories.splice(index, 1);
  }

  save() {
    this.updateProduct();
    this.fileService.uploadFiles(this.formData).subscribe(
      (idsList) => {
        if (this.id === 0) {
          this.product.images = idsList;
          this.productService
            .addProduct(this.product)
            .pipe(take(1))
            .subscribe(
              (product) => {
                this.snackBar.open('saved succesfully', 'OK', {
                  duration: 2000,
                });
                this.product = new Product();
                this.updateForm();
                this.files = [];
              },
              (error) => {
                this.snackBar.open('error try later', 'OK', {
                  duration: 2000,
                });
              }
            );
        } else {
          this.product.productId = this.id;
          idsList.forEach((id) => this.product.images.push(id));
          this.productService
            .updateProduct(this.product)
            .pipe(take(1))
            .subscribe(
              (product) => {
                this.snackBar.open('saved succesfully', 'OK', { duration: 2000 });
                this.loadProduct();
                this.updateForm();
                this.files = [];
              },
              (error) => this.snackBar.open('error try later', 'OK', { duration: 2000 })
            );
        }
      },
      (error) => console.log(error)
    );
  }

  deleteImage(i: number) {
    this.fileService
      .deletFile(this.product.images[i])
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.snackBar.open('Image Deleted', 'OK', { duration: 2000 });
          this.loadProduct();
        },
        (error) => {
          console.log(error);
          this.snackBar.open('error', 'OK', { duration: 2000 });
        }
      );
  }

  delete() {
    this.productService
      .deleteProduct(this.id)
      .pipe(take(1))
      .subscribe(
        (resp) => {
          this.snackBar.open('Delete success', 'OK', {
            duration: 2000,
          });
          this.router.navigate(['admin/products']);
        },
        (error) => {
          this.snackBar.open('error try later', 'OK', {
            duration: 2000,
          });
        }
      );
  }
  goCategories() {
    this.router.navigate(['/admin/categories']);
  }

  // file upload

  uploadFile(event) {
    console.log(event);
    for (const file of event) {
      this.files.push(file);
    }
    this.formData = new FormData();
    for (const file of this.files) {
      this.formData.append('files', file);
    }
    console.log(this.formData.get('files'));
  }
  deleteAttachment(i: number) {
    this.files.splice(i, 1);
  }
}

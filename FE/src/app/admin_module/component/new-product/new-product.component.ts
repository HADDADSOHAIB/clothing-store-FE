import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { ProductService } from 'src/app/services/product-service/product.service';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { UploadFilesService } from 'src/app/services/upload-files-service/upload-files.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {

  // files: File[] = [];
  // formData: FormData = new FormData();
  coverImage: File;
  productImages: File[] = [];

  id: number = 0;
  form: FormGroup;
  product: Product = new Product(null, null, null, null, [], null, null, null, null);
  categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
    private snackBar: MatSnackBar,
    private fileService: UploadFilesService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      category: [0],
    });

    this.activatedRoute.paramMap.pipe(take(1)).subscribe((param) => {
      if (param.get('id') != 'new') {
        this.id = parseInt(param.get('id'), 10);
        // this.loadProduct();
      }
    });

    this.categoryService
      .getCategories()
      .pipe(take(1))
      .subscribe((res) => (this.categories = res.categories));
  }

  selectCategroy(e) {
    const category = this.categories.find((cat) => cat.id === parseInt(e.value, 10));
    const alreadyIn = this.product.categories.find((cat) => cat.id === parseInt(e.value, 10));
    if (category && !alreadyIn) {
      this.product.categories.push(category);
    }
  }

  removeCategory(id: number) {
    const index = this.product.categories.findIndex((category) => category.id === id);
    this.product.categories.splice(index, 1);
  }

  save() {
    if (this.product.categories.length === 0) {
      this.snackBar.open('Select at least one category', 'Ok', { duration: 2000 });
    } else if (this.form.valid) {
      this.product.name = this.form.get('name').value;
      this.product.description = this.form.get('description').value;
      this.product.price = parseInt(this.form.get('price').value, 10);

      this.productService
        .createProduct(this.product)
        .pipe(take(1))
        .subscribe(
          (res) => {
            this.form.reset({
              name: '',
              description: '',
              price: '',
            });
            this.product.categories = [];

            this.snackBar.open('Product saved successfully', 'Ok', { duration: 2000 });
            if (this.id !== 0) {
              this.router.navigate(['admin', 'products']);
            }
          },
          (err) => this.snackBar.open('Unexpected error try later', 'Ok', { duration: 2000 })
        );
    }
  }

  checkValidity(controleName, error, form) {
    return form.get(controleName).touched && form.get(controleName).hasError(error);
  }

  selectCover(e) {
    const isImage = e.target.files[0].type.match(/image/g);
    if (isImage) {
      this.coverImage = e.target.files[0];
    }
    else {
      this.snackBar.open('Only images are allowed', 'Ok', { duration: 2000 });
    }
  }

  deselectCover() {
    this.coverImage = undefined;
  }

  selectImages(e) {
    Object.values(e.target.files).forEach((file: File) => {
      const imageInTheList = this.productImages.find(image => image.name === file.name);
      if (file.type.match(/image/g) && !imageInTheList) {
        this.productImages.push(file);
      }
      else if (!file.type.match(/image/g)) {
        this.snackBar.open('Only images are allowed', 'Ok', { duration: 2000 });
      }
    });
  }

  deselectImage(i) {
    this.productImages.splice(i, 1);
  }


  goCategories() {
    this.router.navigate(['admin', 'categories']);
  }

  // file upload

  // uploadFile(event) {
  //   console.log(event);
  //   for (const file of event) {
  //     this.files.push(file);
  //   }
  //   this.formData = new FormData();
  //   for (const file of this.files) {
  //     this.formData.append('files', file);
  //   }
  //   console.log(this.formData.get('files'));
  // }
  // deleteAttachment(i: number) {
  //   this.files.splice(i, 1);
  // }
}

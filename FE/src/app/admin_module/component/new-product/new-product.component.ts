import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { ProductService } from 'src/app/services/product-service/product.service';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { UploadFilesService } from 'src/app/services/upload-files-service/upload-files.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription, forkJoin, Observable, Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit, OnDestroy {

  showUpload: boolean = false;
  coverImage: File;
  coverPer: number = 0;

  productImages: File[] = [];
  imagesPer: number[] = [];

  uploadDone$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  s: Subscription[] = [];

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
    private fileService: UploadFilesService,
    public auth: AngularFireAuth
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

  private updateUploadStatus(coverPer, imagesPer = [], uploadDone$) {
    if(coverPer === 100 && imagesPer.every(imagePer => imagePer === 100)){
      uploadDone$.next(true);
    }
    else uploadDone$.next(false);
  }

  save() {
    this.auth.signInAnonymously().then(res => {
      const [coverTaskRef, ...imagesTaskRefs] = this.fileService.uploadFile([this.coverImage, ...this.productImages]);
      console.log(coverTaskRef);
      console.log(imagesTaskRefs);
      
      this.s.push(coverTaskRef.task.percentageChanges().subscribe(res =>{
        this.coverPer = Math.round(res);
        this.updateUploadStatus(this.coverPer, this.imagesPer, this.uploadDone$);
      }));
      
      imagesTaskRefs.forEach((taskRef, i) => {
        this.imagesPer.push(0);
        this.s.push(taskRef.task.percentageChanges().subscribe(res => {
          this.imagesPer[i] = Math.round(res);
          this.updateUploadStatus(this.coverPer, this.imagesPer, this.uploadDone$);
        }));
      });

      this.s.push(this.uploadDone$.subscribe(async res => {
        if (res) {
          const coverUrl = await coverTaskRef.ref.getDownloadURL().toPromise();
          const imagesUrl = await Promise.all([...(imagesTaskRefs.map(taskRef => taskRef.ref.getDownloadURL().toPromise()))]);
          console.log(coverUrl);
          console.log(imagesUrl);
        }
      }));
    });

    // if (this.product.categories.length === 0) {
    //   this.snackBar.open('Select at least one category', 'Ok', { duration: 2000 });
    // } else if (this.form.valid) {
    //   this.product.name = this.form.get('name').value;
    //   this.product.description = this.form.get('description').value;
    //   this.product.price = parseInt(this.form.get('price').value, 10);

    //   this.productService
    //     .createProduct(this.product)
    //     .pipe(take(1))
    //     .subscribe(
    //       (res) => {
    //         this.form.reset({
    //           name: '',
    //           description: '',
    //           price: '',
    //         });
    //         this.product.categories = [];

    //         this.snackBar.open('Product saved successfully', 'Ok', { duration: 2000 });
    //         if (this.id !== 0) {
    //           this.router.navigate(['admin', 'products']);
    //         }
    //       },
    //       (err) => this.snackBar.open('Unexpected error try later', 'Ok', { duration: 2000 })
    //     );
    // }
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

  ngOnDestroy() {
    this.s.forEach(s => s.unsubscribe());
  }
}

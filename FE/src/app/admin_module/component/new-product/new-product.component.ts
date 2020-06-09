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

  coverImage: File;
  coverPer: number = 0;

  productImages: File[] = [];
  imagesPer: number[] = [];

  uploadDone$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  s: Subscription[] = [];

  id: number = 0;
  form: FormGroup;
  product: Product = new Product(null, null, null, null, [], null, null, null, null, null);
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
    this.initilizeForm('', '', '');

    this.activatedRoute.paramMap.pipe(take(1)).subscribe((param) => {
      if (param.get('id') != 'new') {
        this.id = parseInt(param.get('id'), 10);
        this.productService
          .getProduct(this.id)
          .pipe(take(1))
          .subscribe(res => {
            this.product = res;
            const { name, description, price } = this.product;
            this.initilizeForm(name, description, price);
            console.log(res);
          });
      }
    });

    this.categoryService
      .getCategories()
      .pipe(take(1))
      .subscribe((res) => (this.categories = res.categories));
  }

  private initilizeForm(name, description, price) {
    this.form = this.formBuilder.group({
      name: [name, Validators.required],
      description: [description],
      price: [price, Validators.required],
      category: [0],
    });
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
    }
    else if (!this.product.coverImage && !this.coverImage) {
      this.snackBar.open('Cover Image is required', 'Ok', { duration: 2000 });
    } else if (this.form.valid) {
      this.auth.signInAnonymously().then(res => {
        const [coverRef, ...imagesRefs] = this.uploadImages();
        
        if(!coverRef && !imagesRefs.length) {
          this.uploadDone$.next(true);
        }

        this.s.push(this.uploadDone$.subscribe(res => {
          if (res) {
            setTimeout(async () => {
              const { name, description, price } = this.form.value;
              const { id, categories, rating, reviews, quantity } = this.product;

              const coverImage = (coverRef ? await coverRef.getDownloadURL().toPromise() : this.product.coverImage);
              const images =(imagesRefs.length != 0 ? await Promise.all([...(imagesRefs.map(ref => ref.getDownloadURL().toPromise()))]) : this.product.images);
    
              this.product = new Product(
                id,
                name,
                description,
                parseInt(price, 10),
                categories,
                rating,
                images,
                reviews,
                quantity,
                coverImage
              );
    
              this.productService
                .createOrUpdateProduct(this.product)
                .pipe(take(1))
                .subscribe(
                  (res) => {
                    this.resetAllFields()
                    this.snackBar.open('Product saved successfully', 'Ok', { duration: 2000 });
                    if (this.id !== 0) {
                      this.router.navigate(['admin', 'products']);
                    }
                  },
                  (err) => this.snackBar.open('Unexpected error try later', 'Ok', { duration: 2000 })
                );
            }, 500);
          }
        }));
      });  
    }
  }

  private resetAllFields() {
    this.form.reset();
    this.product = new Product(null, null, null, null, [], null, null, null, null, null);
    this.coverPer = 0;
    this.coverImage = undefined;
    this.productImages = [];
    this.imagesPer = [];
  }

  private uploadImages() {
    const [coverTaskRef, ...imagesTaskRefs] = this.fileService.uploadFile([this.coverImage, ...this.productImages]);
    const result =[];

    if(coverTaskRef){
      this.s.push(coverTaskRef.task.percentageChanges().subscribe(res =>{
        this.coverPer = Math.round(res);
        this.updateUploadStatus(this.coverPer, this.imagesPer, this.uploadDone$);
      }));

      result.push(coverTaskRef.ref);
    }
    else {
      result.push('');
      this.coverPer = 100;
    }
    
    if(imagesTaskRefs.length){
      imagesTaskRefs.forEach((taskRef, i) => {
        this.imagesPer.push(0);
        this.s.push(taskRef.task.percentageChanges().subscribe(res => {
          this.imagesPer[i] = Math.round(res);
          this.updateUploadStatus(this.coverPer, this.imagesPer, this.uploadDone$);
        }));
        result.push(taskRef.ref)
      });
    }

    console.log(result);
    return result;
  }

  private updateUploadStatus(coverPer, imagesPer = [], uploadDone$) {
    if(coverPer === 100 && imagesPer.every(imagePer => imagePer === 100)){
      uploadDone$.next(true);
    }
    else uploadDone$.next(false);
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

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category-service/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  updateCategoryForm: FormGroup;

  categories: Category[] = [];
  productsPerCategory: any = {};
  newCategoryForm: FormGroup;

  constructor(
    private formeBuilder: FormBuilder,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.newCategoryForm = this.formeBuilder.group({
      name: ['', Validators.required],
    });
    this.updateCategoryForm = this.formeBuilder.group({
      categoryId: [''],
      categoryName: [''],
    });

    this.categoryService
      .getCategories()
      .pipe(take(1))
      .subscribe((res) => {
        this.categories = res.categories;
        this.productsPerCategory = res.productsPerCategory;
      });
  }

  checkValidity(controleName, error, form) {
    return form.get(controleName).touched && form.get(controleName).hasError(error);
  }

  create() {
    console.log(this.newCategoryForm);
  }

  // create() {
  //   const name = this.newCategoryForm.get('category').value;
  //   if (!name.trim()) {
  //     this.snackBar.open('Entre a valid name', 'Ok', { duration: 2000 });
  //   } else {
  //     const category = new Category(0, name);
  //     this.categoryService
  //       .addCategory(category)
  //       .pipe(take(1))
  //       .subscribe(
  //         (category) => {
  //           this.newCategoryForm.get('category').setValue('');
  //           this.snackBar.open('category: ' + category.categoryName + ' is added successfully', 'Ok', {
  //             duration: 2000,
  //           });
  //           this.loadCategories();
  //         },
  //         (error) => this.snackBar.open('Error server down try later again', 'Ok', { duration: 2000 })
  //       );
  //   }
  // }
  delete() {
    const id = parseInt(this.updateCategoryForm.get('categoryId').value);
    this.categoryService
      .deleteCategory(id)
      .pipe(take(1))
      .subscribe(
        (resp) => {
          this.snackBar.open('deleted successfully', 'Ok', { duration: 2000 });
          // this.loadCategories();
        },
        (error) => this.snackBar.open('error try later again', 'Ok', { duration: 2000 })
      );
  }
  // update() {
  //   const id = parseInt(this.updateOrDeleteCategoryForm.get('categoryId').value);
  //   const name = this.updateOrDeleteCategoryForm.get('categoryName').value as string;
  //   if (!id) {
  //     this.snackBar.open('select a category', 'Ok', { duration: 2000 });
  //   } else if (!name.trim()) {
  //     this.snackBar.open('Entre a valid name', 'Ok', { duration: 2000 });
  //   } else {
  //     this.categoryService
  //       .updateCategory(new Category(id, name))
  //       .pipe(take(1))
  //       .subscribe(
  //         (category) => {
  //           this.snackBar.open('Category: ' + category.categoryName + ' is updated', 'Ok', { duration: 2000 });
  //           this.loadCategories();
  //           this.updateOrDeleteCategoryForm.get('categoryName').setValue('');
  //         },
  //         (error) => this.snackBar.open('error try later again', 'Ok', { duration: 2000 })
  //       );
  //   }
  // }
}

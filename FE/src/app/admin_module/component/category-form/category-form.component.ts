import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  editCategoryForm: FormGroup;
  oldName: string = '';
  categories: Category[] = [];
  categories$: BehaviorSubject<Category[]> = new BehaviorSubject(this.categories);
  productsPerCategory: any = {};
  newCategoryForm: FormGroup;
  show: boolean = false;

  constructor(
    private formeBuilder: FormBuilder,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.newCategoryForm = this.formeBuilder.group({
      name: ['', Validators.required],
    });
    this.editCategoryForm = this.formeBuilder.group({
      id: [''],
      newName: ['', Validators.required],
    });

    this.categoryService
      .getCategories()
      .pipe(take(1))
      .subscribe((res) => {
        this.categories = res.categories;
        this.productsPerCategory = res.productsPerCategory;
        this.categories$.next(this.categories);
      });
  }

  create() {
    if (this.newCategoryForm.valid) {
      const newCategory = new Category(null, this.newCategoryForm.value.name);
      this.categoryService
        .createCategory(newCategory)
        .pipe(take(1))
        .subscribe(
          (res) => {
            this.newCategoryForm.reset({ name: '' });

            newCategory.id = res.data.id;
            this.categories.push(newCategory);
            this.productsPerCategory[newCategory.id] = 0;
            this.categories$.next(this.categories);
            this.snackBar.open('Category created successfully', 'Ok', { duration: 2000 });
          },
          (err) => this.snackBar.open('Unexpected error try later', 'Ok', { duration: 2000 })
        );
    } else {
      this.newCategoryForm.get('name').markAsDirty();
    }
  }

  checkFormStatus(form, controleName) {
    if (form.get(controleName).pristine) {
      form.reset({ [controleName]: '' });
    }
  }

  checkValidity(controleName, error, form) {
    return form.get(controleName).dirty && form.get(controleName).hasError(error);
  }

  delete(id) {
    const index = this.categories.findIndex((cat) => cat.id === parseInt(id, 10));
    if (index !== -1 && confirm(`Are you sure to delete ${this.categories[index].name}`)) {
      this.categoryService
        .deleteCategory(id)
        .pipe(take(1))
        .subscribe(
          (res) => {
            this.categories.splice(index, 1);
            this.categories$.next(this.categories);
            this.snackBar.open('Category deleted successfully', 'Ok', { duration: 2000 });
          },
          (err) => this.snackBar.open('Unexpected error try later', 'Ok', { duration: 2000 })
        );
    }
  }

  showUpdateForm(id) {
    let editCategory = this.categories.find((cat) => cat.id === parseInt(id, 10));
    if (editCategory) {
      this.oldName = editCategory.name;
      this.show = true;
      this.editCategoryForm.get('id').setValue(id);
    }
  }

  hideUpdateForm() {
    this.show = false;
    this.oldName = '';
    this.editCategoryForm.get('id').setValue('');
  }

  update() {
    if (this.editCategoryForm.valid) {
      const editCategory = new Category(this.editCategoryForm.value.id, this.editCategoryForm.value.newName);

      this.categoryService
        .updateCategory(editCategory)
        .pipe(take(1))
        .subscribe(
          (res) => {
            const index = this.categories.findIndex((cat) => cat.id === editCategory.id);
            if (index !== -1) {
              this.categories[index].name = editCategory.name;
              this.categories$.next(this.categories);
              this.snackBar.open('Category updated successfully', 'Ok', { duration: 2000 });
              this.editCategoryForm.reset({ id: '', newName: '' });
              this.show = false;
            }
          },
          (err) => this.snackBar.open('Unexpected error try later', 'Ok', { duration: 2000 })
        );
    } else {
      this.editCategoryForm.get('newName').markAsDirty();
    }
  }
}

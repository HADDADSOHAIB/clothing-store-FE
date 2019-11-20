import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/shared/Models/category';
import { CategoryService } from '../../service/category-service/category.service';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  displayedColumns: string[] = ['Category', 'Products N°','Options'];
  newCategoryForm:FormGroup;
  manageCategoryForm:FormGroup;
  categories:Category[]=[];
  constructor(
    private formeBuilder:FormBuilder,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.newCategoryForm=this.formeBuilder.group({
      category:['']
    });
    this.manageCategoryForm=this.formeBuilder.group({
      categoryId:[''],
      categoryName:['']
    });
    this.loadCategories();
  }

  private loadCategories() {
    this.categoryService.getCategories().pipe(take(1)).subscribe(categories => this.categories = categories);
  }

  create(){
    let name=this.newCategoryForm.get('category').value as string;
    if (!name.trim())
      this.snackBar.open("Entre a valid name", 'Ok', {
        duration: 2000,
      });
    else {
      let category = new Category(0, name);
      this.categoryService.addCategory(category).pipe(take(1)).subscribe(category => {
        this.newCategoryForm.get('category').setValue('');
        this.snackBar.open("category: " + category.categoryName + " is added successfully", 'Ok', {
          duration: 2000,
        });
        this.loadCategories();
      }, error => {
        this.snackBar.open("Error server down try later again", 'Ok', {
          duration: 2000,
        });
      });
    }
  }
  delete(){
    let id=parseInt(this.manageCategoryForm.get('categoryId').value);
    this.categoryService.deleteCategory(id).pipe(take(1)).subscribe(resp=>{
      this.snackBar.open("deleted successfully", 'Ok', {
        duration: 2000,
      });
      this.loadCategories();
    },error=>{
      this.snackBar.open("error try later again", 'Ok', {
        duration: 2000,
      });
    });
  }
  update(){
    let id=parseInt(this.manageCategoryForm.get('categoryId').value);
    let name=this.manageCategoryForm.get('categoryName').value as string;
    if(!id){
      this.snackBar.open("select a category", 'Ok', {
        duration: 2000,
      });
    }
    else if(!name.trim())
      this.snackBar.open("Entre a valid name", 'Ok', {
        duration: 2000,
      });
    else{
      this.categoryService.updateCategory(new Category(id,name)).pipe(take(1)).subscribe(category=>{
        this.snackBar.open("Category: "+category.categoryName+" is updated", 'Ok', {
          duration: 2000,
        });
        this.loadCategories();
        this.manageCategoryForm.get('categoryName').setValue('');
      }, error => {
        this.snackBar.open("error try later again", 'Ok', {
          duration: 2000,
        });
      });
    }
  }
}

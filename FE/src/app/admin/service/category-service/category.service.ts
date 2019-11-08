import { Injectable } from '@angular/core';
import { Category } from 'src/app/shared/Models/category';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoriesDb: Category[]=[
    new Category(1,'Dairy'),
    new Category(2,'fruit'),
    new Category(3,'Beard'),
    new Category(4,'Vegetables'),
    new Category(5,'Meat and Poultry')
  ];
  categoriesSubject: BehaviorSubject<Category[]>=new BehaviorSubject(this.categoriesDb);

  constructor() { }

  load() {
    return this.categoriesSubject;
  }
}

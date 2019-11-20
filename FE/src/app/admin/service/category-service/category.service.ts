import { Injectable } from '@angular/core';
import { Category } from 'src/app/shared/Models/category';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BACK_END } from 'backend';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  addCategory(category:Category){
    return this.httpClient.post(BACK_END+"categories",category) as Observable<Category>;
  }

  getCategories(){
    return this.httpClient.get(BACK_END+"categories") as Observable<Category[]>;
  }
  deleteCategory(id:number){
    return this.httpClient.delete(BACK_END+"categories/"+id);
  }
  updateCategory(category:Category){
    return this.httpClient.put(BACK_END+"categories/"+category.categoryId,category) as Observable<Category>;
  }
}

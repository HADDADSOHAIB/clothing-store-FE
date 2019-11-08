import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products-service/products.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/Operators';
import { Product } from 'src/app/shared/Models/product';

@Component({
  selector: 'app-product-management-form',
  templateUrl: './product-management-form.component.html',
  styleUrls: ['./product-management-form.component.scss']
})
export class ProductManagementFormComponent implements OnInit {
  form: FormGroup;
  id: number=0;
  product: Product=new Product();
  constructor(
    private productService: ProductsService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form=this.formBuilder.group({
      name:[''],
      description:[''],
      price:[''],
      quantity:['']
    });

    this.activatedRoute.paramMap.pipe(take(1)).subscribe(param=>{
      this.id=parseInt(param.get("id"));
      this.productService.get(this.id).pipe(take(1)).subscribe(prod=>{
        this.product=prod;

        this.form=this.formBuilder.group({
          name:[this.product.productName],
          description:[this.product.description],
          price:[this.product.price],
          quantity:[this.product.quantity]
        });
      });
    });
  }

  save(){
    this.product.productName=this.form.get("name").value;
    this.product.description=this.form.get("description").value;
    this.product.quantity=parseInt(this.form.get("quantity").value);
    this.product.price=parseInt(this.form.get("price").value);
    if(this.id===0)
    this.productService.add(this.product);
    else
    this.productService.update(this.product);
  }
}

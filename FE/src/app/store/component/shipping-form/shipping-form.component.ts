import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../service/cart-service/cart.service';
import { take } from 'rxjs/operators';
import { OrderService } from '../../../shared/services/order-service/order.service';
import { Order } from '../../../shared/Models/order';
import { Router } from '@angular/router';
import { Cart } from 'src/app/shared/Models/cart';
import { ShippingInfos } from 'src/app/shared/Models/shipping-info';
import { User } from 'src/app/shared/Models/user';
import { AccountService } from 'src/app/shared/services/account-service/account.service';
import { Address } from 'src/app/shared/Models/address';
import { OrderItem } from 'src/app/shared/Models/order-item';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit {
  form: FormGroup;
  cart: Cart;
  shippingInfo: ShippingInfos;
  user:User;
  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private accountService:AccountService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.cartService.getCart().pipe(take(1)).subscribe(cart=>this.cart=cart);
    this.form=this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      phoneNumber:['',Validators.required],
      addressId:[''],
      firstLine: ['',Validators.required],
      secondLine: [''],
      city: ['',Validators.required],
      state: ['',Validators.required],
      country: ['',Validators.required],
      zipCode: ['',Validators.required]
    });

    this.accountService.getCurrentUser().subscribe(user=>this.user=user);
  }

  placeOrder(){
    this.shippingInfo=new ShippingInfos(
      0,
      this.form.get('firstName').value,
      this.form.get('lastName').value,
      this.form.get('phoneNumber').value,
      this.form.get('firstLine').value,
      this.form.get('secondLine').value,
      this.form.get('city').value,
      this.form.get('state').value,
      this.form.get('country').value,
      this.form.get('zipCode').value
    );
    
    this.orderService.placeOrder(new Order(0,
      this.user.userEmail,
      this.cart.items.map(cartItem=>new OrderItem(0,
        cartItem.product.productId,
        cartItem.product.productName,
        cartItem.itemQuantity,
        cartItem.itemPrice)),
      this.shippingInfo)).pipe(take(1)).subscribe(order=>{
        console.log(order);
        this.snackBar.open("Order placed succes","Ok",{duration:2000});
      },error=>{
        console.log(error);
        this.snackBar.open("Error try later","Ok",{duration:2000});
      });
    
    let address = new Address(
      parseInt(this.form.get('addressId').value),
      this.form.get('firstLine').value,
      this.form.get('secondLine').value,
      this.form.get('city').value,
      this.form.get('state').value,
      this.form.get('country').value,
      this.form.get('zipCode').value
    );

    if (!this.isAddressExistInTheAccount(address)) {
      address.id = 0;
    }

    //add the address to the account
  }

  updateForm($event){
    let addressId=$event.value;
    let index=this.user.addresses.findIndex(address=>address.id===addressId);
    this.form.get('addressId').setValue(addressId);
    this.form.get('firstLine').setValue(this.user.addresses[index].firstLine);
    this.form.get('secondLine').setValue(this.user.addresses[index].secondLine);
    this.form.get('city').setValue(this.user.addresses[index].city);
    this.form.get('state').setValue(this.user.addresses[index].state);
    this.form.get('country').setValue(this.user.addresses[index].country);
    this.form.get('zipCode').setValue(this.user.addresses[index].zipCode);
  }
  goStore(){
    this.router.navigate(["store"]);
  }

  goCart(){
    this.router.navigate(["store/checkout"]);
  }
  isAddressExistInTheAccount(address:Address){
    let isAddressExist=false;
    for(let addr of this.user.addresses){
      if(addr.city.toLowerCase().trim()===address.city.toLowerCase().trim())
      if(addr.country.toLowerCase().trim()===address.country.toLowerCase().trim())
      if(addr.firstLine.toLowerCase().trim()===address.firstLine.toLowerCase().trim())
      if(addr.state.toLowerCase().trim()===address.state.toLowerCase().trim())
      if(addr.zipCode.toLowerCase().trim()===address.zipCode.toLowerCase().trim())
      isAddressExist=true;
    }
    return isAddressExist;
  }
}
import { Component, OnInit } from '@angular/core';
import { Credentials } from '../../../core/Models/credentials';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth-service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  form=new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required])
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  Login(){
    let credentials=new Credentials(this.form.get('email').value,this.form.get('password').value);
    this.authService.login(credentials).subscribe(resp=>{
      localStorage.setItem('token',resp.token);
      this.router.navigate(["/"]);
    },error=>alert(error));
  }
}

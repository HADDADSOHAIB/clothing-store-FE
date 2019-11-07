import { Component, OnInit } from '@angular/core';
import { Credentials } from '../../../core/Models/credentials';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MustMatch } from '../../custom-validators/password-must-match';
import { mustContainUpperCase, mustContainNumber, mustContainLowerCase, mustContainSpecialCaracter } from '../../custom-validators/password-pattern';
import { AuthService } from '../../service/auth-service/auth.service';
import { take } from 'rxjs/Operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Email } from '../../../core/Models/email';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  credentials: Credentials;
  emailForm: FormGroup;
  passwordForm: FormGroup;
  emailOk:boolean=false;
  accountCreated:boolean=false;
  creationResult$:Subject<string>=new Subject<string>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {  }

  ngOnInit() {
    this.emailForm=this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]]
    });

    this.passwordForm=this.formBuilder.group({
      password: ['',[Validators.required,Validators.minLength(6),
        mustContainUpperCase,mustContainNumber,mustContainLowerCase,
        mustContainSpecialCaracter]],
      confirmPassword: ['',Validators.required]
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  checkEmail(){
    this.authService.checkEmail(new Email(this.emailForm.get('email').value))
      .pipe(take(1)).subscribe(resp=>{
        this.emailOk=true;
        this.openSnackBar('email OK');
      },
      error=>{
        console.log(error);
        this.emailOk=false;
        this.openSnackBar('Email NOK');
      });
  }

  createAccount(){
    this.credentials=new Credentials(
      this.emailForm.get('email').value,
      this.passwordForm.get('password').value
    );

    this.authService.createAccount(this.credentials)
      .pipe(take(1)).subscribe(resp=>{
        this.accountCreated=true;
        localStorage.setItem("token",resp.token);
        this.creationResult$.next("Account created, un email is sent to your inbox for verification");
      },
      error=>{
        console.log(error);
        this.accountCreated=false;
        this.creationResult$.next("Unexpected error, please check your internet connection or try later");
      });
  }

  openSnackBar(message:string) {
    this.snackBar.open(message, "Ok", {
      duration: 5000
  });
  }

  routeToHome(){
    this.router.navigate(["/"]);
  }
}

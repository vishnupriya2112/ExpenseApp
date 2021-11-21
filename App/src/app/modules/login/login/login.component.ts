import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';

import { SocialAuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { Router } from '@angular/router';
import { RequestService } from 'src/app/shared/service/request.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;
  
  loginForm: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  message;
  error:boolean=false;
  userDetail: any;
  constructor(
    private auth:AuthService,
    private formBuilder: FormBuilder,
    private login:LoginService,
    private authService: SocialAuthService,
     private router:Router,
     private requestService:RequestService,
     private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required]
    });

    this.message=this.login.message;
    this.error=this.login.error;
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }else{
      this.requestService.post('login',this.loginForm.value).subscribe(
      (response) => {
        if(response){
          console.log(response);
        this.message="Login sucessfully";
        console.log("Form submitted successfully");
        this.auth.setToken(response);
        this.router.navigate(['user']);
        }
        
    },
      (error) => {
        if(error.status==400){
          this.error=true;
          this.message="User Not Found";
        }
        if(error.status==401){
          this.error=true;
          this.message="Usename or Password Wrong";
        }
        this.snackBar.open(this.message, 'Done',{duration: 3000});
        console.log(error.status);
        console.log("Form not submitted successfully");

      }
    )
    
    }
    
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data)=>{
      localStorage.setItem('token',data.idToken);

      this.requestService.getUserProfile('user',data.email).subscribe(
        (res)=>{
          if(res){
            this.router.navigateByUrl('/user').then();
          }
          else{
            this.authService.signOut();
          }

        },
        (error)=>{
            if(error.status==400){
            this.error=true;
            this.message="We can’t find an account.";
          }
          if(error.status==401){
            this.error=true;
            this.message="Usename or Password Wrong";
          }
          this.snackBar.open(this.message, 'Done',{duration: 3000});
          console.log("Form not submitted successfully");
            this.authService.signOut();
            this.auth.logout();
        }
      )
    })
    
  }


}
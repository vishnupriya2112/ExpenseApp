import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../service/register.service';
import { GoogleLoginProvider, SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit {

  @ViewChild('contactForm') contactForm: NgForm;
  
  contact=new contactDetail();
  userData= new contactDetail();
  route: ActivatedRoute;
  
  user: SocialUser;

  constructor(
    private router:Router,
    private register:RegisterService,
    private authService: SocialAuthService
      ) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      console.log(user);
      this.userData={
        'name':user.name,
        'email':user.email,
        'dob':'',
        'gender':'',
        'password':'',
        'cpassword':''
      }
      console.log(this.userData);
      this.user = this.user;
      //this.register.addUser(JSON.stringify(this.userData));
      this.router.navigate(['/login'],{ relativeTo: this.route });

    });
  }

  onSubmit(form:any) {
    this.register.addUser(form.value);
    this.router.navigate(['/login'],{ relativeTo: this.route });
  }
  signUpWithGoogle(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

}

export class contactDetail {
  name:string;
  dob:string;
  email:string;
  gender:string;
  password:string;
  cpassword:string;
} 

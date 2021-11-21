import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { AuthService } from 'src/app/shared/service/auth.service';
import { RequestService } from 'src/app/shared/service/request.service';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public userData:any;
  userDetail: any;
  
  constructor(
    private requestService:RequestService,
    private route:ActivatedRoute,
    private router:Router,
    private auth:AuthService,
    private authService: SocialAuthService,
    public datepipe:DatePipe
  ) {
    var token=this.auth.getToken();
    //console.log(token);
    this.userDetail=this.getUserPayload(token);
    this.requestService.getUserProfile('user',this.userDetail.email).subscribe(
      (res)=>{
        if(res){
          console.log(res);
        this.userData=res;
        }
        else{
          this.authService.signOut();
        }
        
      },
      (err)=>{
        console.log(err);
      }
    )
   }
  ngOnInit(): void {
    
  }
  

  getUserPayload(token){
    
    //console.log(token);
    if(token){
      var userPayload=atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else{
      return false;
    }
  }
  gotoProfile(){
    this.router.navigate(["../edit"], {relativeTo: this.route, queryParams: {email:this.userData.email}});
  
   }

   deleteUser(){
    if(confirm("Are you sure to delete this account? ")) {
      this.requestService.delete('delete',this.userData.email).subscribe((res)=>{
        console.log('Account deleted Sucessfully');
      },(err)=>{
        console.log(err);
      })
      this.auth.logout();
  }
    
  }

}

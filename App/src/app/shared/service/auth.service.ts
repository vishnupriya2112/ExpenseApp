import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) {}

  setToken(responseObj:any){
    if(responseObj){
      localStorage.setItem('token',responseObj.token);
    }
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getEmailId(){
    var token=this.getToken();
    return atob(token.split('.')[1])
  }
  getUserPayload(){
    var token=this.getToken();
    if(token){
      var userPayload=atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else{
      return false;
    }
  }

  isLoggenIn(){
    const token=localStorage.getItem('token');
    const google_auth=localStorage.getItem('google_auth');
    if(token||google_auth){
      return true;
    }
    else{
      return false;
    }
  }
  
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { RequestService } from 'src/app/shared/service/request.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  message;
  error:boolean=false;
  constructor(
    private request:RequestService,
    private router:Router,
    private auth:AuthService,
    private http:HttpClient
  ) { }
    

}

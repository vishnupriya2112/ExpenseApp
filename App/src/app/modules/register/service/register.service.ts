import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/shared/service/request.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private request:RequestService,
    private http:HttpClient) { }

  addUser(userData: string){
    //console.log(userData);
    this.request.post('register',userData).subscribe(
      (response) => {
        console.log(response);
        console.log("Form submitted successfully");
      },
      (error) => {
        console.log(error);
        console.log("Form not submitted successfully");
      }
    )
  }
}


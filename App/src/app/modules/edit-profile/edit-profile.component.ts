import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { RequestService } from 'src/app/shared/service/request.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  contact=new contactDetail();
  sub: any;
  id: any;
  contactForm= new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    dob: new FormControl(),
    gender: new FormControl()
  });

  email: any;
  constructor(
    private formBuilder: FormBuilder,
    private route:ActivatedRoute,
    private router:Router,
    private requestService:RequestService  ) 
    { 
       this.route.queryParams.subscribe(params => {
        this.email = params['email'];
        console.log(this.email);
        this.requestService.get('user/edit',this.email).subscribe(
          (response)=>{
            console.log(response);
             this.setDefault(response);
             
          },
          (err)=>{
            console.log(err);
          })  
    });
    }
    

  ngOnInit(){
    
  }
  
  onSubmit() {
    console.log(this.contactForm.value);
    this.requestService.post('update',this.contactForm.value).subscribe(
      (response) => {
        console.log(response);
        console.log("Form submitted successfully");
        this.router.navigate(['/user']);
        
      },
      (error) => {
        console.log(error);
        console.log("Form not submitted successfully");
      }
    )
  }
  setDefault(res:any){

    let contact = {
      name: res.name,
      email: res.email,
      dob:formatDate(res.dob,'yyyy-MM-dd','en-GB') ,
      gender: res.gender
    };
     this.contactForm.setValue(contact);
  }


}

export class contactDetail {
  name:string;
  dob:string;
  email:string;
  gender:string;
} 

export class contact {
  name:string;
  dob:string;
  email:string;
  gender:string;
  password:string;
  cpassword:string;

  constructor(name: string,dob: string,email: string,gender: string,password: string,cpassword: string){
      this.name=name;
      this.dob=dob;
      this.email=email;
      this.gender=gender;
      this.password=password;
      this.cpassword=cpassword;
  }
} 
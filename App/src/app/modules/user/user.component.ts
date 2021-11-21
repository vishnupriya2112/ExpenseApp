import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { RequestService } from 'src/app/shared/service/request.service';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  userData: any;
  email: any;
  userDetail: any;
  

  constructor(private auth:AuthService,
    private route:ActivatedRoute,
    private router:Router,
    private requestService:RequestService,
    private observer: BreakpointObserver,
    private authService: SocialAuthService
    ) {
    
  }

  
  
  logout(){
    this.auth.logout();
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 1000px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }
  
  ngOnInit() {
    
  }
  getUserPayload(token){
    
    console.log(token);
    if(token){
      var userPayload=atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else{
      return false;
    }
  }
  

}


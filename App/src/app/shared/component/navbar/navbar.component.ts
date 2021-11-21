import { Component, OnInit, ViewChild,Output,EventEmitter } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public auth:AuthService) { }
    
  ngOnInit(): void {
    
  }
}

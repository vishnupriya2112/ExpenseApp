import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compare-dates',
  templateUrl: './compare-dates.component.html',
  styleUrls: ['./compare-dates.component.scss']
})
export class CompareDatesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  chooseDate1(event){
    console.log(event);
  }
  chooseDate2(event){
    console.log(event);
  }
}

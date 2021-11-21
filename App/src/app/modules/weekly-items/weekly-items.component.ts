import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-weekly-items',
  templateUrl: './weekly-items.component.html',
  styleUrls: ['./weekly-items.component.scss']
})

export class WeeklyItemsComponent implements OnInit {

  @Output() selectedWeek: EventEmitter<any> = new EventEmitter<{start_date:Date,end_date:Date}>();

  constructor() { }

  date=new Date();
  start_date=this.date.setDate(this.date.getDate() - 7);
  end_date=new Date();

  range = new FormGroup({
    start: new FormControl(new Date(this.start_date)),
    end: new FormControl(new Date(this.end_date))
  });
  
  ngOnInit(): void {
    //this.showByWeekly(this.range.value.start,this.range.value.end);
    //this.selectedWeek.emit({start_date:this.range.value.start,end_date:this.range.value.end});
  }

  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement){
  
  let newDate = new Date(dateRangeStart.value);
  console.log(newDate);
  let newDate1 = new Date(dateRangeEnd.value);
  console.log(newDate1);
  this.selectedWeek.emit({start_date:newDate,end_date:newDate1});
}

}

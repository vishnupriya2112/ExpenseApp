import { Component,EventEmitter,OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-daily-items',
  templateUrl: './daily-items.component.html',
  styleUrls: ['./daily-items.component.scss'],
  
})
export class DailyItemsComponent implements OnInit {

  @Output() selectedDay: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    
  }
  selectedDate(date){
    this.selectedDay.emit(date);
  }
  

}

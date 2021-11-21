import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-budget-item-card',
  templateUrl: './budget-item-card.component.html',
  styleUrls: ['./budget-item-card.component.scss']
})


export class BudgetItemCardComponent implements OnInit {

  
  @Input() item:any;
  @Output() xButtonClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() cardClick: EventEmitter<any> = new EventEmitter<any>();
    
  constructor(public datepipe:DatePipe) { }

  ngOnInit() {
    console.log(this.item);
  }

  onXButtonClick() {
    // here we want emit an event
    this.xButtonClick.emit();
  }

  onCardClick() {
    this.cardClick.emit();
  }

}
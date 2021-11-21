import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BudgetItem, PeriodicElement, UpdateEvent } from 'src/app/shared/models/budget-item.model';
import { MatDialog } from '@angular/material/dialog';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';
import { RequestService } from 'src/app/shared/service/request.service';


const ELEMENT_DATA: PeriodicElement[] =[];
//   {"_id":"615a914c4650358b5da05df3","email":"vishnu@gmail.com","added_date":"2021-10-04T05:29:41.923Z","amount":-5000,"description":"Food","__v":0},
//   {"_id":"615a91874650358b5da05df6","email":"vishnu@gmail.com","added_date":"2021-10-04T05:30:34.003Z","amount":10000,"description":"Gift","__v":0},
//   {"_id":"615a91994650358b5da05df8","email":"vishnu@gmail.com","added_date":"2021-10-04T05:30:51.529Z","amount":-555,"description":"Recharge","__v":0},
//   {"_id":"615c20dd0803f865a63e981f","email":"vishnu@gmail.com","added_date":"2021-09-30T09:54:27.225Z","amount":50000,"description":"Salary","__v":0},
//   {"_id":"615c3d517af72c4da86ae2c8","email":"vishnu@gmail.com","added_date":"2021-10-05T11:55:51.006Z","amount":-1000,"description":"Water","__v":0},
//   {"_id":"615edf97f8a08ba2a1842a99","email":"vishnu@gmail.com","added_date":"2021-10-07T11:52:46.459Z","amount":-1000,"description":"aa","__v":0},
//   {"_id":"615edf9ff8a08ba2a1842a9b","email":"vishnu@gmail.com","added_date":"2021-10-07T11:52:57.545Z","amount":1000,"description":"bb","__v":0},
//   {"_id":"616655f96df3213a69712a8f","email":"vishnu@gmail.com","added_date":"2021-10-13T03:43:43.774Z","amount":30000,"description":"Salary","__v":0}
// ];

@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss']
})


export class BudgetItemListComponent implements OnInit {

  arraylength:number=0;
  @Input() budgetItems: any[];
  @Input() datasource;
  @Output() delete: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();
  @Output() update: EventEmitter<UpdateEvent> = new EventEmitter<UpdateEvent>();

  displayedColumns: string[] = ['_id','added_date', 'amount','description'];
  // dataSource: PeriodicElement[];
  
  constructor(public dialog: MatDialog,private requestService:RequestService) { 
    
  }

  ngOnInit() {
    // var jsonString = JSON.stringify(this.budgetItems);
    // console.log(jsonString);
    //this.dataSource=jsonString;
    // if(this.budgetItems){
    //   console.log(this.budgetItems);
    //   var keys = Object.keys(this.budgetItems);
    //   this.arraylength = keys.length;
    //   console.log(this.arraylength);
    // }

    // var items=this.budgetItems;

    //   Object.keys(items).map(function(key){ 
    //     console.log(items[key]);
    //     ELEMENT_DATA.push(items[key])   
    //   });
    //   this.dataSource = ELEMENT_DATA;
    //   console.log(this.dataSource);
  }

  onDeleteButtonClicked(item: BudgetItem) {
    this.delete.emit(item);
  }

  onCardClicked(item: BudgetItem) {
    // show the edit modal
    const dialogRef = this.dialog.open(EditItemModalComponent, {
      width: '580px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      // check if result has a value
      if (result) {
        this.update.emit({
          old: item,
          new: result
        });
      }
    })
  }

}




import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BudgetItem, PeriodicElement, UpdateEvent } from 'src/app/shared/models/budget-item.model';
import { RequestService } from 'src/app/shared/service/request.service';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';

// const ELEMENT_DATA: PeriodicElement[] =[
//   {id: '615a914c4650358b5da05df3', amount: -5000, description: 'Food', date: '2021-10-04T05:29:41.923Z'},
// {id: '615edf97f8a08ba2a1842a99', amount: -1000, description: 'aa', date: '2021-10-07T11:52:46.459Z'},
// {id: '615a91994650358b5da05df8', amount: -555, description: 'Recharge', date: '2021-10-04T05:30:51.529Z'},
// {id: '615edf9ff8a08ba2a1842a9b', amount: 1000, description: 'bb', date: '2021-10-07T11:52:57.545Z'},
// {id: '6166dc15ffef6602f8f08344', amount: -1000, description: 'Food', date: '2021-10-13T13:15:45.753Z'},
// {id: '6166dc3fffef6602f8f08347', amount: -3000, description: 'fg', date: '2021-10-13T13:16:37.518Z'},
// {id: '615c20dd0803f865a63e981f', amount: 50000, description: 'Salary', date: '2021-09-30T09:54:27.225Z'},
// {id: '616655f96df3213a69712a8f', amount: 30000, description: 'Salary', date: '2021-10-13T03:43:43.774Z'},
// {id: '615c3d517af72c4da86ae2c8', amount: -1000, description: 'Water', date: '2021-10-05T11:55:51.006Z'},
// {id: '615a91874650358b5da05df6', amount: 10000, description: 'Gift', date: '2021-10-04T05:30:34.003Z'}
// ];

@Component({
  selector: 'app-table-items',
  templateUrl: './table-items.component.html',
  styleUrls: ['./table-items.component.scss']
})
export class TableItemsComponent implements OnInit {

  @Input() datasource;
  
  //dataSource: MatTableDataSource<PeriodicElement> = new MatTableDataSource([]) ;
  displayedColumns: string[] = ['description','amount','date','action'];

  @Output() delete: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();
  @Output() update: EventEmitter<UpdateEvent> = new EventEmitter<UpdateEvent>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public datepipe:DatePipe,public dialog: MatDialog,private requestService:RequestService) {}

  ngAfterViewInit() {
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }

  ngOnInit(): void {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.datasource.filter = filterValue.trim().toLowerCase();
    console.log(this.datasource);
  }

  onDeleteButtonClicked(item: BudgetItem) {
    console.log(item);
    this.delete.emit(item);
  }
 
  onCardClicked(item: BudgetItem) {
    console.log(item);
    const dialogRef = this.dialog.open(EditItemModalComponent, {
      width: '580px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.update.emit({
          old: item,
          new: result
        });
      }
    })
  }
}






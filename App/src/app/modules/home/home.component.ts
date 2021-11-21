import { DatePipe } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { BudgetItem, PeriodicElement } from 'src/app/shared/models/budget-item.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { RequestService } from 'src/app/shared/service/request.service';
import { AddItemFormComponent } from '../add-item-form/add-item-form.component';

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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  
})
export class HomeComponent implements OnInit {

  email:any;

  budgetItems: any;
  dailyItems:any;
  weeklyItems:any;
  monthlyItems:any;

  totalBudget: number=0;
  income:number=0;
  expense:number=0;

  date=new Date();
  start_date=this.date.setDate(this.date.getDate() - 7);
  end_date=new Date();

  
  
  displayedColumns: string[] = ['_id','added_date', 'amount','description'];
  
  public dataSource = new MatTableDataSource<BudgetItem>();

  constructor(private requestService:RequestService,
              private snackBar: MatSnackBar,
              private auth:AuthService,
              public dialog: MatDialog,
              public datepipe:DatePipe,
              
              ) { }

  itemForm=new FormGroup({
    id:new FormControl(),
    added_date: new FormControl(),
    amount: new FormControl(),
    description: new FormControl()
  });

  ngOnInit() {

    let data=JSON.parse(this.auth.getEmailId());
    this.email=data;
    
    this.requestService.showitem(data.email).subscribe((res)=>{
      this.budgetItems=res[0].itemsSold as BudgetItem;
      this.dataSource.data=res[0].itemsSold as BudgetItem[];
      var items=res[0].itemsSold as BudgetItem;

      Object.keys(items).map(function(key){ 
        ELEMENT_DATA.push(items[key])   
      });

      console.log(ELEMENT_DATA);

      //this.dataSource = ELEMENT_DATA;
      this.calculateBalance(res);
      console.log(this.budgetItems);
      this.showBydate(new Date());
      this.showByWeekly(new Date(this.start_date),new Date(this.end_date));
      this.showByMonthly(new Date());
      
    },(err)=>{
      console.log(err);
    })
    
  }
  
  selectedDate(date){
    this.showBydate(date);
  }

  selectedWeek(rangeDate){
    console.log(rangeDate.start_date);
    console.log(rangeDate.end_date);
    this.showByWeekly(rangeDate.start_date,rangeDate.end_date);
  }

  selectedMonth(date){
    this.showByMonthly(date);
  }

  showBydate(date){
    let latest_date =this.datepipe.transform(date, 'dd-MM-yyyy');
    console.log(latest_date);
    this.dailyItems = this.budgetItems.filter(h => this.datepipe.transform(h.added_date,'dd-MM-yyyy')===latest_date );
    console.log(this.dailyItems);
  }

  showByWeekly(date1,date2){
    let start = new Date(date1).getTime();
    let end = new Date(date2).getTime();
    console.log(date1,date2);
    this.weeklyItems = this.budgetItems.filter(
    h => new Date(h.added_date).getTime()>=start && new Date(h.added_date).getTime()<=end); 
    console.log(this.weeklyItems);
  }
  showByMonthly(date){
    let latest_date =this.datepipe.transform(date, 'MM-yyyy');
    console.log(latest_date);
    this.monthlyItems = this.budgetItems.filter(h => this.datepipe.transform(h.added_date,'MM-yyyy')===latest_date );
    console.log(this.monthlyItems);
  }

  calculateBalance(res){
    let items=res[0].itemsSold;
    for(let item of items){
      if(item.amount>0){
        this.income=this.income+item.amount;
      }
      if(item.amount<0){
        this.expense=this.expense+item.amount;
      }
      this.totalBudget=this.income+this.expense;
    }
  }

  onCardClicked() {
    const dialogRef = this.dialog.open(AddItemFormComponent, {
      width: '580px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.addItem(result);
      }
    })
  }

  // addItem(item:BudgetItem){
  //   this.itemService.addItem(item);
  // }
  // deleteItem(item:any){
  //   this.itemService.deleteItem(item);
  // }
  // updateItem(updateEvent){
  //   this.itemService.updateItem(updateEvent);
  // }

  addItem(item:BudgetItem){
    console.log(item);
    this.requestService.addItem(item).subscribe(
      (res)=>{
        if(res){
          console.log(res);
          this.budgetItems.push(res);
          if(res.amount>0)
            this.income+=res.amount;
          if(res.amount<0)
            this.expense+=res.amount;
          this.totalBudget=this.income+this.expense;
          
          this.snackBar.open('Added Successfully', 'Done',{duration: 3000});
        }
          
      },
      (err)=>{
        this.snackBar.open('Added Failed', 'Done',{duration: 3000});
      }
    )
  }
  deleteItem(item:any) {
  console.log(item);
    if(item.amount>0)
            this.income-=item.amount;
          if(item.amount<0)
            this.expense-=item.amount;
    this.totalBudget=this.income+this.expense;
    this.requestService.deleteItem(item._id).subscribe((res)=>{
      //this.dataSource = this.dataSource.filter(h => h !== item);
      this.snackBar.open('Deleted Successfully', 'Done',{duration: 3000});
    },(err)=>{
      this.snackBar.open('Deleted Failed', 'Done',{duration: 3000});
    })
  }

  updateItem(updateEvent) {
    console.log(updateEvent.old);
    console.log(updateEvent.new);
    let date=updateEvent.new.added_date.toISOString();
    const items={
      id:updateEvent.old._id,
      added_date:date,
      amount:updateEvent.new.amount,
      description:updateEvent.new.description
    }
    console.log(items);
    this.itemForm.setValue(items);
    console.log(this.itemForm.value);
    let index = this.budgetItems.indexOf(updateEvent.old);
    this.budgetItems[index]=this.itemForm.value;
    this.requestService.updateItem(this.itemForm.value).subscribe((res)=>{
      
      this.snackBar.open('Updated Successfully', 'Done',{duration: 3000});
    },(err)=>{
      this.snackBar.open('Updated Failed', 'Done',{duration: 3000});
    })
  }
 }
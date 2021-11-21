// import { Injectable } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { BudgetItem } from '../models/budget-item.model';
// import { RequestService } from './request.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class ItemsService {

//     budgetItems: any;
//     dailyItems:any;
//     weeklyItems:any;
//     monthlyItems:any;

//     totalBudget: number=0;
//     income:number=0;
//     expense:number=0;

//     itemForm=new FormGroup({
//     id:new FormControl(),
//     added_date: new FormControl(),
//     amount: new FormControl(),
//     description: new FormControl()
//   });

  
//   constructor(private requestService:RequestService,private snackBar: MatSnackBar) { }

//   ngOnInit() {
//   }
  
//   addItem(item:BudgetItem){
//     console.log(item);
//     this.requestService.addItem(item).subscribe(
//       (res)=>{
//         if(res){
//           console.log(res);
//           this.budgetItems.push(res);
//           if(res.amount>0)
//             this.income+=res.amount;
//           if(res.amount<0)
//             this.expense+=res.amount;
//           this.totalBudget=this.income+this.expense;
          
//           this.snackBar.open('Added Successfully', 'Done',{duration: 3000});
//         }
          
//       },
//       (err)=>{
//         this.snackBar.open('Added Failed', 'Done',{duration: 3000});
//       }
//     )
//   }
//   deleteItem(item:any) {
//     if(item.amount>0)
//             this.income-=item.amount;
//           if(item.amount<0)
//             this.expense-=item.amount;
//     this.totalBudget=this.income+this.expense;
//     this.requestService.deleteItem(item._id).subscribe((res)=>{
//       this.budgetItems = this.budgetItems.filter(h => h !== item);
//       this.snackBar.open('Deleted Successfully', 'Done',{duration: 3000});
//     },(err)=>{
//       this.snackBar.open('Deleted Failed', 'Done',{duration: 3000});
//     })
//   }

//   updateItem(updateEvent) {
//     console.log(updateEvent.old);
//     console.log(updateEvent.new);
//     let date=updateEvent.new.added_date.toISOString();
//     const items={
//       id:updateEvent.old._id,
//       added_date:date,
//       amount:updateEvent.new.amount,
//       description:updateEvent.new.description
//     }
//     console.log(items);
//     this.itemForm.setValue(items);
//     console.log(this.itemForm.value);
//     let index = this.budgetItems.indexOf(updateEvent.old);
//     this.budgetItems[index]=this.itemForm.value;
//     this.requestService.updateItem(this.itemForm.value).subscribe((res)=>{
      
//       this.snackBar.open('Updated Successfully', 'Done',{duration: 3000});
//     },(err)=>{
//       this.snackBar.open('Updated Failed', 'Done',{duration: 3000});
//     })
//   }

// }

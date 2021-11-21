import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BudgetItem } from 'src/app/shared/models/budget-item.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { RequestService } from 'src/app/shared/service/request.service';



@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.scss']
})
export class AddItemFormComponent implements OnInit {

  data:any;
  @Input() item: BudgetItem;
  @Output() formSubmit: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();
  transaction:string='expense';
  isNewItem: boolean;

  constructor(private authService:AuthService,
    private requestService:RequestService,
              public dialogRef: MatDialogRef<AddItemFormComponent>
              )
              { 
                  this.data=JSON.parse(this.authService.getEmailId());
              }

  
  myGroup = new FormGroup({
    added_date: new FormControl(new Date(),Validators.required),
    email: new FormControl(),
    amount: new FormControl(),
    description: new FormControl()
  });

  ngOnInit() {

    if(this.item){
      this.transaction=(this.item.amount>0)?'income':'expense';
      console.log(this.transaction);
      this.myGroup = new FormGroup({
        added_date: new FormControl(this.item.date,Validators.required),
        email: new FormControl(this.authService.getEmailId(),Validators.required),
        amount: new FormControl(this.item.amount,Validators.required),
        description: new FormControl(this.item.description,Validators.required)
  });
    }

    if (this.item) {
      this.isNewItem = false;
    } else {
      this.isNewItem = true;
      //this.item = new BudgetItem(new Date(),'','', null);
    }
  }

  changeTransaction(trans:string){
    this.transaction=trans;
    console.log(this.transaction);
  }
  onSubmit(form) {
    console.log(form);
    if(this.transaction!='income'&&form.value.amount>0){
      form.value.amount*=-1;
    }
    
    const items={
      added_date:form.value.added_date,
      email:this.data.email,
      amount:form.value.amount,
      description:form.value.description
    }
    this.myGroup.setValue(items);
    console.log(this.myGroup.value);
    this.dialogRef.close(this.myGroup.value);
    this.formSubmit.emit(this.myGroup.value);
    form.reset();
  }

}



import { Component, OnInit, Inject } from '@angular/core';
import { BudgetItem } from 'src/app/shared/models/budget-item.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-item-modal',
  templateUrl: './edit-item-modal.component.html',
  styleUrls: ['./edit-item-modal.component.scss']
})
export class EditItemModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public item: BudgetItem) { }

  ngOnInit() {
    console.log(this.item);
  }

  onSubmitted(updatedItem: BudgetItem) {
    
    this.dialogRef.close(updatedItem);
  }

}

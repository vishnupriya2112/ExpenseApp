  
export class BudgetItem {

    id:string;
  date: string;
  amount: number;
  description: string;
    //constructor(public added_date:any,public email: string,public description: string, public amount: number) { }
}

export class Item{
    constructor(public description: string) { }

}
export class Amount{
    constructor(public amount: string) { }

}

export interface PeriodicElement {
  id:string;
  date: string;
  amount: number;
  description: string;
}

export interface UpdateEvent {
  old: BudgetItem;
  new: BudgetItem;
}
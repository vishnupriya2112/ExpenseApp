import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';
import { RequestService } from 'src/app/shared/service/request.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  selectedValue:string;

  budgetItems:any;
  dailyItems:any;
  weeklyItems:any;
  monthlyItems:any;

  income_amount=[];
  income_title=[];
  expense_amount=[];
  expense_title=[];
  color=[];

  barchartData={
    starting_date:Date,
    ending_date:Date,
    totalincome:[],
    totalexpense:[]
  }

  value=new FormControl('selectedValue');

  constructor(private requestService:RequestService,public auth:AuthService,public datepipe:DatePipe) { }

  ngOnInit() {
    let data=JSON.parse(this.auth.getEmailId());

    this.requestService.showDesc(data.email).subscribe((res)=>{
      console.log(res);
      this.budgetItems=res[0].descList;
      console.log(this.budgetItems);
      this.showAllData();
    },(err)=>{
      console.log(err);
    })

  }
onChangeCategory(event:any){
  console.log(event.value);
  this.selectedValue=event.value;
  
  if(event.value==="all"){
    this.showAllData();
  }
  else if(event.value==="daily"){
    console.log(event.value==="daily");
    this.showDailyData(new Date());
  }
  else if(event.value==="weekly"){
    console.log(event.value==="weekly");
    this.showWeeklyData(new Date(),new Date().setDate(new Date().getDate() - 7));
  }
  else if(event.value==="monthly"){
    this.showMonthlyData(new Date());
  }
  else if(event.value==="compare-date"){
    this.compareTwoDates(new Date(),new Date().setDate(new Date().getDate() - 1));
  }
}
 
selectedDate(event){
  console.log(event.value);
    this.showDailyData(event.value);
  }
selectedWeek(rangeDate){
    console.log(rangeDate.start_date);
    console.log(rangeDate.end_date);
    this.showWeeklyData(rangeDate.start_date,rangeDate.end_date);
  }

  selectedMonth(date){
    this.showMonthlyData(date);
  }

 compareDates(event){
  console.log(event.start_date);

  console.log(event.end_date);
  this.compareTwoDates(event.start_date,event.end_date);
 }

 compareTwoDates(date1,date2){
  let start = new Date(date1);
  let end = new Date(date2);
    //console.log(this.datepipe.transform(start,'dd-MM-yyyy'));
  this.barchartData.starting_date=date1;
  this.barchartData.ending_date=date2;

  let items1 = this.budgetItems.filter(h => this.datepipe.transform(h.date,'dd-MM-yyyy')===this.datepipe.transform(start,'dd-MM-yyyy') );
  let items2 = this.budgetItems.filter(h => this.datepipe.transform(h.date,'dd-MM-yyyy')===this.datepipe.transform(end,'dd-MM-yyyy') );
  this.calculateBarItem(items1,items2);
  console.log(items1);
  console.log(items2);
 }

 calculateBarItem(item1,item2){
   console.log(item1);
   console.log(item2);
   let income=0,expense=0,income1=0,expense1=0;
   console.log('qqq');
   this.barchartData.totalexpense.length=0;
   this.barchartData.totalincome.length=0;
   console.log(this.barchartData.totalexpense);
  console.log(this.barchartData.totalincome);
  for(const data of item1)
  {
    
    if(data.amount>0)
    {
      console.log(data.amount);
      income+=data.amount;
    }
    if(data.amount<0)
    {
      console.log(data.amount);
      expense+=data.amount;
    }
    
  }
  console.log(this.barchartData.totalexpense);
  console.log(this.barchartData.totalincome);
 
  for(const data of item2)
  {
    
    if(data.amount>0)
    {
      console.log(data.amount);
      income1+=data.amount;
    }
    if(data.amount<0)
    {
      console.log(data.amount);
      expense1+=data.amount;
    }
    
  }
  console.log(income,expense);
  this.barchartData.totalincome.push(income);
  this.barchartData.totalexpense.push(expense);
  this.barchartData.totalincome.push(income1);
  this.barchartData.totalexpense.push(expense1);
  console.log(income,expense,income1,expense1);
  
  console.log(this.barchartData.totalexpense);
  console.log(this.barchartData.totalincome);
}

showAllData(){
  console.log(this.budgetItems);
  this.calculateItem(this.budgetItems);
}
showDailyData(date){
  let items = this.budgetItems.filter(h => this.datepipe.transform(h.date,'dd-MM-yyyy')===this.datepipe.transform(date,'dd-MM-yyyy') );
  console.log(items);
  this.calculateItem(items);
}
showWeeklyData(date1,date2){
  let start = new Date(date1).getTime();
    let end = new Date(date2).getTime();
    let items = this.budgetItems.filter(h => new Date(h.date).getTime()>=start && new Date(h.date).getTime()<=end); 
    console.log(items);
    this.calculateItem(items);
}
showMonthlyData(date){
  let latest_date =this.datepipe.transform(date, 'MM-yyyy');
    console.log(latest_date);
    let items = this.budgetItems.filter(h => this.datepipe.transform(h.date,'MM-yyyy')===latest_date );
    console.log(items);
    this.calculateItem(items);
}

calculateItem(datas)
{
  this.income_amount.length=0;
  //this.income_amount=[];
  this.income_title.length=0;
  this.expense_amount.length=0;
  this.expense_title.length=0;
  this.color.length=0;
  console.log(this.income_amount);  
  console.log(datas);
  for(const data of datas)
  {
    console.log(data);
    const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
    const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
    if(data.amount>0)
    {
      // this.incomeItem.amount.push(data.amount);
      // this.incomeItem.title.push(data.description);
      // this.incomeItem.color.push(randomRGB()); 
      console.log(data.amount);
      this.income_amount.push(data.amount);
      this.income_title.push(data.description);
      this.color.push(randomRGB()); 
    }
    if(data.amount<0)
    {
      // this.expenseItem.title.push(data.description);
      // this.expenseItem.amount.push(data.amount);
      // this.expenseItem.color.push(randomRGB());
      console.log(data.amount);
      this.expense_amount.push(data.amount);
      this.expense_title.push(data.description);
      this.color.push(randomRGB());
    }
  }

  console.log(this.income_amount);     
}
}
















































// onSelect(){
//     console.log(this.selectedValue);
//   }
//   tabClick(tab) {
//   console.log(tab.tab.textLabel);
//   if(tab.tab.textLabel=="All"){
//     this.showAllData();
//   }
//   else if(tab.tab.textLabel=="Daily"){
//     this.showDailyData();
//   }
//   else if(tab.tab.textLabel=="Weekly"){
//     this.showWeeklyData();
//   }
//   else if(tab.tab.textLabel=="Monthly"){
//     this.showMonthlyData();
//   }
// }

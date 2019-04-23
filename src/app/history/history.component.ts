import { Component, OnInit } from '@angular/core';

import { History } from '../history';

import { HistoryService } from '../history.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  history:History[]=[];

  currentTime;

  constructor(private historyService:HistoryService, private location:Location) { 

  		this.currentTime=new Date().getTime();
  }

  goBack():void{
    this.location.back();
  }

  ngOnInit() {

  	this.history=this.historyService.get();
  }

  clearHistory()
  {
  		this.history.length=0;
  }



  // FUNCTION TO OOBTAIN FORMMATED DATETIME STRING

  getFormattedTime(datetime:string):string{

  	let viewdate=new Date(datetime).getTime();

  	let difference=this.currentTime - viewdate;

    let num;

    if(difference >= 60000)
    {
        num=Math.round(difference/60000);

        return this.getMinuteString(num);
    }
    else
    {
        num=Math.round((difference /1000)); 

        return this.getSecondString(num);
    }

  }


  getSecondString(num:number):string{
      if(num > 1)
      {
        return `${num} seconds ago`;
      }

      return `${num} second ago`;
  }

  getMinuteString(num:number):string{
      if(num > 1)
      {
        return `${num} minutes ago`;
      }

      return `${num} minute ago`;
  }
}


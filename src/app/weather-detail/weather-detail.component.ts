import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, tap , map} from 'rxjs/operators';
import { Observable, of} from 'rxjs';
import { History } from '../history';
import { HistoryService } from '../history.service';
import { config } from '../config'; 

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css']
})
export class WeatherDetailComponent implements OnInit {

  city:string;
  country_code:string;

  date:string;

  weather=[];

  forecastweather=[];

  errornum:number=0;

  successnum:number=0;

  apikey=config.api_key;

  id=524901;

  constructor(private route:ActivatedRoute, private http:HttpClient, private historyService:HistoryService, private location:Location) { }

  goBack():void {
    this.location.back();
  }

  ngOnInit() {
  	this.city=this.route.snapshot.paramMap.get('city');
  	this.country_code=this.route.snapshot.paramMap.get('c_code');

    // LOADING THE CURRENT DAY'S WEATHER

  	this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=
			${this.city},${this.country_code}
			?id=${this.id}&APPID=${this.apikey}&units=metric`).pipe(

          catchError(this.handleError())
      ).subscribe((res:any) => {

        let date=new Date();

        res.date=`${this.getDay(0).substr(0,3)}, ${date.getDate()} ${this.getMonth(0).substr(0,3)}`;
        this.weather=res;

        this.successnum++;

        this.addToHistory(date);

      });

    // LOADING THE FORECAST DATA
 
    this.http.get( `https://api.openweathermap.org/data/2.5/forecast?q=${this.city},${this.country_code}&cnt=33&APPID=${this.apikey}&units=metric`).pipe(
      
        catchError(this.handleError())
      ).subscribe((res:any)=>{

      for(var i=1; i <= 4 ; i++)
      {
        if(i == 1)
        {
          res.list[i * 8].date='Tomorrow';
        }
        else
        {
           res.list[i * 8].date=this.getDateString(i);
        }

        this.forecastweather.push(res.list[i * 8]);

        this.successnum++;
      }
    })

  }



 // ADDING THE CURRENLY VIEWED CITY TO THE HISTORY ARRAY

  addToHistory(date:Date):void{

    let dateString=`${date.getDate()} ${this.getMonth(0)} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    let session:History={id:this.historyService.history.length + 1, city:this.city, c_code:this.country_code, time:dateString};

    this.historyService.add(session);
  }


  // EXCEPTION HANDLER METHOD

  private handleError<T>(result?:T)
  {
    return (error:any) => {
      if(this.isEmpty())
      {
          this.errornum++;
      }

      return of(result as T);
    }
  }

  // FORMATTING THE DATE OF THE FORECASTED WEATHER DATA APPROPRIATELY

  getDateString(val:number):string
  {
      let date=new Date();
     
      let newdate=date.getDate() + val;      

      return `${this.getDay(val)} ${newdate}`;
  }


  getDay(val){
      let date=new Date();

      let newDay;

      let DayArray=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      if((date.getDay() + val) <= 6)
      {
         newDay=DayArray[date.getDay() + val];
      }
      else
      {
        newDay=DayArray[(date.getDay() + val) - 7];
      }


      return newDay;
  }


  getMonth(val){

    let date=new Date();

     let month=date.getMonth();

     let newmonth:string;

     let monthArray=['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October', 'November', 'December'];

     let monthDurations=[31,28,31,30,31,30,31,31,30,31,30,31];

     let currentMonthDuration=monthDurations[month];

     if((date.getDate() + val) > currentMonthDuration)
     {
        newmonth=monthArray[month + 1];
     }
     else
     {
        newmonth=monthArray[month];
      }

      return newmonth;

  }

  isEmpty()
  {
    if(this.weather.length == 0 || this.forecastweather.length == 0)
    {
      return true;
    }

    return false;
  }

}

import { Component, OnInit } from '@angular/core';
import { CITIES } from '../cities';
import { HttpClient } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

import {Observable,of} from 'rxjs';

import { Location } from '@angular/common';


@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})



export class ExploreComponent implements OnInit {

  weather=[];

  nums:Number[]=[];

  apikey="04805aacf38a86e7644bc839b288ab00";

  id=524901;

  isCompleted:number=0;

  errornum:number=0;

  constructor(private http:HttpClient, private location:Location) { }

  ngOnInit() {

	this.setWeather();
	// console.log(this.weather);

  }

  goBack():void{
    this.location.back();
  }

  // MAIN FUNCTION TO GRAB THE WEATHER OF CITIES

  i=0;

  setWeather():void
  {
    while(this.i < 10)
    {
      let val=Math.floor(Math.random() * CITIES.length);

      if(this.checkNum(val))
      {
          this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${CITIES[val].name},${CITIES[val].country_code}
          ?id=${this.id}&APPID=${this.apikey}&units=metric`).pipe(

              catchError(this.handleError())
          ).subscribe((res:any) => {this.weather.push(res); this.isCompleted+=1});

          this.nums.push(val);
          this.i++;
      }
    }  
  }

  // DETERMINING WHAT HAPPENS IF THE REQUEST TO THE API FAILS

  private handleError<T>(result?:T)
  {
    return (error:any) => {

      this.errornum++;

      return of(result as T);
    }
  }


  // FUNCTION TO CHECK IF THE CITY'S WEATHER HAS BEEN CHECKED ALREADY TO AVOID DUPLICATION

  checkNum(num){

      if(this.nums.indexOf(num) == -1)
      {
        return true;
      }

      return false;
  }

  changeWeather():void{
    this.weather=[];

    this.i=0;

    this.isCompleted=0;

    this.nums=[];

    this.setWeather();


  }

  isEmpty(obj){

    if(obj.length === 0)
    {
      return true;
    }

    return false;
  }

  checkWeatherLength()
  {
    if(this.weather.length == 10)
    {
      return true;
    }

    return false;
  }

}

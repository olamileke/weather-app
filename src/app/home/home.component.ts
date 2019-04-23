import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';

import { Observable } from 'rxjs';

import { City } from '../city';

import cities from '../../assets/cities.json';

import countrycodes from '../../assets/countrycodes.json';

import { debounceTime } from 'rxjs/operators';

import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {



  dialog:boolean=false;

  suggestions_active:boolean=false;

  suggestions:City[]=[];

  constructor( private renderer:Renderer2) { }

  ngOnInit() {

  }


  // OPENING THE SEARCH DIALOG

  triggerDialog():void{

  	this.dialog=true;
  }


  //CLOSING THE SEARCH DIALOG

  closeDialog():void{
  	this.dialog=false;

    this.suggestions.length=0;

    this.suggestions_active=false;
  }


  getSuggestions(val:string):void{  	  

  		this.suggestions=cities.filter(function(city) {

        let capVal=val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();

  			return city.name.startsWith(val.toLowerCase()) || city.name.startsWith(capVal);
  		}).slice(0,5);


      if(this.suggestions.length > 0)
      {
          this.suggestions_active=true;
      }
      else
      {
          this.suggestions_active=false;
      }


  	if(val === '')
  	{
  		this.suggestions.length=0;
      this.suggestions_active=false;
  	}
  }


  findCountryName(code):string{

  	let country=countrycodes.filter(function(obj) {
  		return obj.Code === code;
  	});

  	for(var i=0; i<country.length; i++)
  	{
  		return country[0].Name;
  	}
  }

}

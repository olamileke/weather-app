// CORE ANGULAR IMPORTS

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { WeatherDetailComponent } from './weather-detail/weather-detail.component';


// Importing the components that will be matched to the paths

import { ExploreComponent } from './explore/explore.component';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';



const routes:Routes = [
					  { path:'' , component:HomeComponent },
					  { path:'explore', component:ExploreComponent },
					  {path:'weather/:city/:c_code', component:WeatherDetailComponent},
					  {path:'history', component:HistoryComponent},
					  {path:'**', component:ErrorMsgComponent}
					  ];

@NgModule({
  imports: [
  	RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }

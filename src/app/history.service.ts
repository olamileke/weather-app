import { Injectable } from '@angular/core';
import { History } from './history';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  history:History[]=[];

  constructor() { }

  add(obj:History):void {

  	this.history.push(obj);
  }

  get():History[] {
  	return this.history;
  }
}


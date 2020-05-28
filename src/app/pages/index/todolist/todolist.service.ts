import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {

  constructor() { }
  
  private _todoList = [
    { text: 'Check me out' },
    { text: 'Simul erroribus ad usu' },
    { text: 'Write email to business cat' },
  ];

  getTodoList() {
      return this._todoList;
  }

}

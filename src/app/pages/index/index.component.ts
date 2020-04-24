import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: []
})
export class IndexComponent implements OnInit {
  showloading: boolean = false;

  public AnimationBarOption;

  constructor() { }

  ngOnInit() {
    
  }
}

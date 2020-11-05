import { Component, OnInit } from '@angular/core';
import { SharedStorage } from 'ngx-store';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  @SharedStorage('cart') _cartItem: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
  }

}

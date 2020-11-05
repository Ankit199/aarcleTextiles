import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { LocalStorage } from 'ngx-store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit,OnDestroy {
  constructor() {}
  @LocalStorage() breedcum: string = '';
  @LocalStorage() _id: string = '';
  ngOnInit(): void {
    if (this.breedcum == '' || this.breedcum == undefined) {
      this.breedcum = 'ACCOUNT DASHBOARD';
      this._id = 'U1';
    } else {
      this.applyActiveClass(this._id, this.breedcum);
    }
  }
  ngOnDestroy() {
   this.breedcum='';
   this._id='';
  }

  applyActiveClass = (id: string, bredcum: string) => {
    this.breedcum = bredcum;
    this._id = id;
    const elArr = document.querySelectorAll('.u'); // all
    elArr.forEach((x: any) => {
      x.classList.remove('active');
      if (x.id == id) {
        x.classList.add('active');
        return;
      }
    });
  };
  
}

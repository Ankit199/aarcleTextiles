import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';
import { LocalStorage } from 'ngx-store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy, OnChanges {
  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
      }

      if (event instanceof NavigationEnd) {
        if (this.breedcum == '' || this.breedcum == undefined) {
          this.breedcum = 'ACCOUNT DASHBOARD';
          this._id = 'U1';
        } else {
          if (event.url !== '/in/my-account') {
            this.applyActiveClass(this._id, this.breedcum);
          } else {
            this.breedcum = 'ACCOUNT DASHBOARD';
            this._id = 'U1';
            this.applyActiveClass(this._id, this.breedcum);
          }
        }
      }

      if (event instanceof NavigationError) {
        console.log(event.error);
      }
    });
  }
  @LocalStorage() breedcum: string = '';
  @LocalStorage() _id: string = '';
  i: number = 0;
  ngOnInit(): void {
    console.log(this.router.url);
  }
  ngOnDestroy() {
    this.breedcum = '';
    this._id = '';
  }
  ngOnChanges() {
    console.log(this.i++);
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

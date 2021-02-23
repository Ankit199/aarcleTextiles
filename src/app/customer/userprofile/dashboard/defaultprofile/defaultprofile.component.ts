import { Component, OnInit } from '@angular/core';
import { LocalStorage } from 'ngx-store';
import * as _ from 'lodash';
@Component({
  selector: 'app-defaultprofile',
  templateUrl: './defaultprofile.component.html',
  styleUrls: ['./defaultprofile.component.css']
})
export class DefaultprofileComponent implements OnInit {
  @LocalStorage('user') isUser: any = {};
  constructor() { }

  ngOnInit(): void {
    if(!_.isEmpty(this.isUser)){     
      this.isUser.name = this.isUser.name.charAt(0).toUpperCase() + this.isUser.name.slice(1);
    }
  }

}

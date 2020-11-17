import { Component, OnInit } from '@angular/core';
import { LocalStorage } from 'ngx-store';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Backend/Service/auth.service';
import { FirestoreService } from 'src/app/Backend/Service/firestore.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  @LocalStorage('user') isUser: any = {};
  constructor(private auth:AuthService,  public toast: ToastrService,private sharedService:FirestoreService) { }

  ngOnInit(): void {
    if(!_.isEmpty(this.isUser)){     
      this.isUser.name = this.isUser.name.charAt(0).toUpperCase() + this.isUser.name.slice(1);
    }
  }
  logOut=()=>{
    this.auth.signOut();
    this.isUser={};
  }
}

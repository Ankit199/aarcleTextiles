import { Component, OnInit } from '@angular/core';
import { LocalStorage, SharedStorage } from 'ngx-store';
import { AuthService } from 'src/app/Backend/Service/auth.service';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from 'src/app/Backend/Service/firestore.service';
@Component({
  selector: 'app-headertab',
  templateUrl: './headertab.component.html',
  styleUrls: ['./headertab.component.css']
})
export class HeadertabComponent implements OnInit {
  @LocalStorage('user') isUser: any = {};
  cartItem:any=[];
  constructor(private auth:AuthService,  public toast: ToastrService,private sharedService:FirestoreService) { }

  ngOnInit(): void {    
    if(!_.isEmpty(this.isUser)){     
      this.isUser.name = this.isUser.name.charAt(0).toUpperCase() + this.isUser.name.slice(1);
    }
  this.getCartItem();
  }

  logOut=()=>{
    this.auth.signOut();
    this.isUser={};
  }
  getCartItem=()=>{
          this.sharedService.col$(`cart/${this.isUser.id}/cartItem`).subscribe((_res:any)=>{
            console.log(_res)
          });
       //   console.log(data);
  }


}

import { Component, Inject, OnInit, PLATFORM_ID, Renderer2, } from '@angular/core';
import { LocalStorage, SharedStorage } from 'ngx-store';
import { isPlatformBrowser } from '@angular/common';
import { FirestoreService } from 'src/app/Backend/Service/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @LocalStorage('user') isUser: any = {};
  scriptUrl: string = '../../../assets/js/custom.js';
  constructor(private sharedService:FirestoreService,private renderer: Renderer2,@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {
    this.addJsToElement(this.scriptUrl);
  }
  addJsToElement(src: string): HTMLScriptElement {
    if (isPlatformBrowser(this.platformId)) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.renderer.appendChild(document.body, script);
    return script;
  }
}
addToCart=()=>{
  debugger;
  let data={
    Id:'001',
    name:'Product',
    quantity:1,
    price:700
  };
  this._itemInCart(data).then((_res:any)=>{
    console.log(_res);
  }).catch((_error:any)=>{
    console.error(_error);
  })
}
_itemInCart=(_data:any)=>{
  return this.sharedService.col(`cart`).doc(`${this.isUser.id}`).collection('cartItem').add(_data);
}


}

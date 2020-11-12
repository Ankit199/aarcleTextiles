import { Component, Inject, OnInit, PLATFORM_ID, Renderer2, } from '@angular/core';
import { SharedStorage } from 'ngx-store';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @SharedStorage('cart') _cartItem: Array<any> = [];
  scriptUrl: string = '../../../assets/js/custom.js';
  constructor(private renderer: Renderer2,@Inject(PLATFORM_ID) private platformId: any) {}

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
}

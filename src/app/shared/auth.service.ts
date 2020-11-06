import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor() { }
  getUser=()=>{
    return {Role:'Hello',user:'Ankit'};
   }
   signup=()=>{

   }
}
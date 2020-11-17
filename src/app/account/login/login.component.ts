import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Backend/Service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public router: Router,public auth: AuthService) { 
    this.auth.user.subscribe((userData: any) => {
      console.log(userData, "Login User Data");     
       if (userData) {        
        this.router.navigate(['/home']);
      }else {
        console.log('nowhere');
      }
    });
  }

  ngOnInit(): void {
  }

   goToAuth=()=>{   
        this.router.navigate(['/admin']);
   }

}

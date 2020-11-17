import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorage, SharedStorage } from 'ngx-store';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Backend/Service/auth.service';
import { SpinnerService } from 'src/app/shared/@spinner/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginModel: FormGroup;
  @LocalStorage() user: any ={isLogged:false};
  
  submitted = false;
  constructor(
    public router: Router,
    public auth: AuthService,
    private formBuilder: FormBuilder,
    private spinner:SpinnerService,
    public toast: ToastrService
  ) {
 
    this.auth.user.subscribe((userData: any) => {
      console.log(userData, 'Login User Data');
      if (userData) {      
        this.user= {name: userData.displayName,
        id:userData.uid,
         isLogged:true}
        console.log('*********************Login***********');
        console.log(userData);
        this.router.navigate(['/']);
      } else {
        console.log('nowhere');
      }
    });
  }

  ngOnInit(): void {
    this.loginModel = this.formBuilder.group({
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  get f() {
    return this.loginModel.controls;
  }
  goToAuth = () => {
    this.submitted = true;
    this.spinner.showLoader();
    // stop here if form is invalid
    if (this.loginModel.invalid) {
      return;
    }
    this.auth
      .emailLogin(this.loginModel.value.email, this.loginModel.value.password)
      .then((_res: any) => {
        this.spinner.hideLoader();
      }).catch((error:any)=>{
        this.spinner.hideLoader();
        this.toast.error(error.message,error.code);
      });
   // this.router.navigate(['/admin']);
  };
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorage, SharedStorage } from 'ngx-store';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Backend/Service/auth.service';
import { FirestoreService } from 'src/app/Backend/Service/firestore.service';
import { SpinnerService } from 'src/app/shared/@spinner/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginModel: FormGroup;
  @LocalStorage() user: any = { isLogged: false };

  submitted = false;
  constructor(
    public router: Router,
    public auth: AuthService,
    private formBuilder: FormBuilder,
    private spinner: SpinnerService,
    private sharedService: FirestoreService,
    public toast: ToastrService
  ) {
    this.auth.user.subscribe((userData: any) => {
      console.log(userData, 'Login User Data');
      if (userData) {
        this.getUserProfile(userData.uid);
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

    if (this.loginModel.invalid) {
      this.spinner.hideLoader();
      return;
    }
    this.auth
      .emailLogin(this.loginModel.value.email, this.loginModel.value.password)
      .then((_res: any) => {})
      .catch((error: any) => {
        this.spinner.hideLoader();
        this.toast.error(error.message, error.code);
      });
    // this.router.navigate(['/admin']);
  };
  getUserProfile = (_userId: any) => {
    this.sharedService.doc$(`Users/${_userId}`).subscribe(
      (_res: any) => {
        delete _res.mobile;
        delete _res.password;
        _res.isLogged = true;
        _res.id = _userId;
        this.user = _res;
        this.spinner.hideLoader();
        console.log('*********************Login***********');
        if (_res.Role == 'ADMIN') {
          this.router.navigate(['/admin']);
        }
        if (_res.Role == 'USER') {
          this.router.navigate(['/']);
        }
      },
      (error: any) => {
        this.spinner.hideLoader();
      }
    );
  };
  socialLogin = (type:string)=>{

  }
}

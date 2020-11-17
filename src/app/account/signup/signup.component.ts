import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Backend/Service/auth.service';
import { AlertService } from '../../shared/@alert/alert.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupModel: FormGroup;
  submitted = false;
  constructor(public auth: AuthService,private formBuilder: FormBuilder,public toast:ToastrService) { }

  ngOnInit(): void {
    this.signupModel = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      mobile: ['',[ Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ['', [Validators.required, Validators.email]],
      
  });

  }
  get f() { return this.signupModel.controls; }
  registerUser=()=>{
    this.submitted = true;
this.toast.success('Register Successfully','Registration');
    // stop here if form is invalid
    if (this.signupModel.invalid) {
        return;
    }
    this.signupModel.value.Role='USER';
    debugger;
// this.auth.emailSignUp(this.signupModel.value).then((res:any)=>{
//   console.log('*******************************************');
//   console.log(res);
// }).catch((_err:any)=>{
//   console.log(_err);
// });
  }

}

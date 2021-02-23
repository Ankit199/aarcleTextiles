import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { SubheadertabComponent } from './customer/subheadertab/subheadertab.component';
import { ForgotpasswordComponent } from './account/forgotpassword/forgotpassword.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { WebStorageModule } from 'ngx-store';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingScreenInterceptor } from './shared/loading.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreService } from './Backend/Service/firestore.service';
import { AuthService } from './Backend/Service/auth.service';
import {AngularFireAuthModule} from "angularfire2/auth";
import { ToastrModule } from 'ngx-toastr';
import { AlertModule } from './shared/@alert/alert.module';
import { SpinnerService } from './shared/@spinner/spinner.service';
import { SpinnerComponent } from './shared/@spinner/spinner.component';
export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SpinnerComponent,
    SubheadertabComponent,
    ForgotpasswordComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right'
    }),
    AlertModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    WebStorageModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [
    AngularFireStorage,AuthService,
    AngularFirestore,
    FirestoreService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingScreenInterceptor,
      multi: true,
    }  ,
   SpinnerService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

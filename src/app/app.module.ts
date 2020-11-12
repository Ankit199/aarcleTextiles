import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreService } from './Backend/Service/firestore.service';
export const firebaseConfig = environment.firebaseConfig;
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SubheadertabComponent,
    ForgotpasswordComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ReactiveFormsModule,
    // ToastrModule,
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingScreenInterceptor,
      multi: true,
    },
    AngularFireStorage,
    AngularFirestore,
    FirestoreService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

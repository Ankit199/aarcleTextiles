import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
// import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
// import { User } from 'firebase';
import { SpinnerService } from 'src/app/shared/@spinner/spinner.service';

// export interface User {
//   uid: string;
//   email?: string;
//   emailVerified?: boolean;
//   userID?: string;
//   outletID?: string;
//   userDataID?: string;
//   brandSetup?: boolean;
//   globalSetup?: boolean;
//   roles?: {
//     [key: string]: boolean;
//   };
// }

@Injectable()
export class AuthService {
  userAuth?: any;
  user: any;
  userID: string;
  userDetail: any;
  roleUser: any;
  userData: any;
  newUser: any;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private toaste: ToastrService ,
    private spinner:SpinnerService
  ) {
    this.roleUser = 'admin' || 'user';
    this.userID = '';
    this.userAuth = this.afAuth.auth;
    this.user = this.afAuth.authState
      .pipe
      // switchMap((userData: any) => {
      //  console.log(userData, "auth service user data");
      // this.userData = userData;
      // if (userData) {
      //   return this.afs.doc<User>(`${this.roleUser}/${userData.uid}`).valueChanges();
      // }
      // else {
      //   return observableOf(null);
      // }
      // }),
      ();
  }

  emailLogin(email: string, password: string) {
    // console.log(email, password);
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  sendEmailVerification() {
    const fbAuth = this.userAuth.currentUser;
    if (fbAuth) {
      return fbAuth.sendEmailVerification(null);
    } else {
      return false;
    }
  }

  async isUserEmailVerified() {
    const fbAuth = this.userAuth.currentUser;
    await fbAuth.reload();
    if (fbAuth) {
      return fbAuth.emailVerified;
    } else {
      return false;
    }
  }

  resetPassword(email: string) {
    const fbAuth = this.userAuth;
    return fbAuth.sendPasswordResetEmail(email);
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  // determines if user has matching role
  private checkAuthorization(user: any): boolean {
    if (!user) {
      return false;
    }
    // for (const role of allowedRoles) {
    //   if (user.roles && user.roles[role]) {
    //     return true;
    //   }
    // }
    // return false;
  }
  //charu

  emailSignUp(user) {
    this.spinner.showLoader();
    let email = user.email;
    let password = user.password;
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.newUser = user;
        console.log('userCredential authService', userCredential);
        userCredential.user.updateProfile({          
          displayName: user.name, // when we create email base au thencition  username is not there so we  set user name here
        });
        this.insertUserData(userCredential).then((res) => {
          console.log('res>>', res);   
          this.spinner.hideLoader();      
           // this.router.navigate(['/login'])
        });
      })
      .catch((error:any) => {    
        this.spinner.hideLoader();  
        this.toaste.error(error.message,error.code);
        console.log(error);
      });
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    console.log(' this.newUser authService', this.newUser);    
    return this.afs.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      name: this.newUser.name,
      mobile: this.newUser.mobile,
      password:this.newUser.password,
      Role:this.newUser.Role
    });
  }
  emailSignUp1(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        return this.updateUserOnSignup(user.user);
      });
  }
  // Sets user data to firestore after succesful signup
  private async updateUserOnSignup(FbUser: any) {
    // let path='admin/9ek7PcTgw2z2LMFrp0hj/newUser';
    const newUser = await this.afs.collection('newuser').add({});
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `Ecom/newUser/${FbUser.uid}`
    );
    console.log('auth Service FbUser >>>', FbUser);

    const data: any = {
      uid: FbUser.uid,
      email: FbUser.email,

      emailVerified: FbUser.emailVerified || false,
      userID: newUser.id,
      // brandSetup: false,
      // roles: {
      //   admin: true,
      // },
    };

    return userRef.set(data, { merge: true });
  }

  setRole(role: string) {
    this.roleUser = role;
  }
}

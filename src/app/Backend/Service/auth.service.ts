import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'firebase';

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
  
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.roleUser = 'admin';
    this.userID = '';
    this.userAuth = this.afAuth.auth;
    this.user = this.afAuth.authState.pipe(
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
    );
  }

  // authResolver() {
  //   return new Promise((resolve, reject) => {
  //     if (this.userID !== '' && this.user) {
  //       resolve({});
  //     }
  //     this.afAuth.authState.subscribe((userData: any) => {
  //       // console.log(userData);
  //       if (userData && userData.uid) {
  //         // if (!userData.emailVerified) {
  //         // 	this.router.navigate([ '/auth/email-verify' ]);
  //         // 	resolve();
  //         // }
  //         this.afs.doc<User>(`${this.roleUser}/${userData.uid}`).valueChanges().subscribe((userDetail) => {
  //           // console.log(userDetail, this.roleUser);
  //           if (userDetail) {
  //             this.userDetail = userDetail;
  //             this.userID = this.userDetail.userID;
  //             resolve({});
  //           } else {
  //             this.roleUser = this.roleUser === 'admin' ? 'subadmin' : 'admin';
  //             if (this.roleUser === 'admin') {
  //               this.router.navigate(['/reports/main']);
  //               resolve();
  //             } else {
  //               const tmp = window.location.href.toString().split('#')[1];
  //               // console.log(tmp);
  //               this.router.navigate([tmp === '/auth/login' ? '/outlet/outlets' : tmp]);
  //               resolve();
  //             }
  //           }
  //         });
  //       } else {
  //         resolve({});
  //       }
  //     });
  //   });
  // }



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
      this.router.navigate(['/login']);
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
  let email=user.email;
  let password=user.password;
  return this.afAuth.auth.createUserWithEmailAndPassword(email, password).
  then((userCredential) => {

   this.newUser=user;
   console.log("userCredential authService",userCredential);
   userCredential.user.updateProfile({//
     displayName:user.name // when we create email base au thencition  username is not there so we  set user name here

   });
   this.insertUserData(userCredential).then((res)=>{
     console.log("res>>",res);
    //  this.router.navigate(['/home'])
     
   });
  }).catch((error)=>{console.log(error);
  })
}

insertUserData(userCredential:firebase.auth.UserCredential){
  console.log(" this.newUser authService", this.newUser);
  debugger
return  this.afs.doc(`EcomNewUsers/${userCredential.user.uid}`).set({
  email:this.newUser.email,
  name:this.newUser.name,
  mobile:this.newUser.mobile,
 
})
}
emailSignUp1(email: string, password: string) {
  return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((user) => {
     return this.updateUserOnSignup(user.user);
  });
}
  // Sets user data to firestore after succesful signup 
  private async updateUserOnSignup(FbUser: any) {
    // let path='admin/9ek7PcTgw2z2LMFrp0hj/newUser';
    const newUser = await this.afs.collection('newuser').add({});
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`Ecom/newUser/${FbUser.uid}`);
console.log("auth Service FbUser >>>",FbUser);

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

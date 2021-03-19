import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
//import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { Addcategory } from 'src/app/Backend/Service/firestore.path';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from 'src/app/Backend/Service/firestore.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
  selectedFile: File = null;
  fb:any;
  downloadURL: Observable<string>;
  customeErrortag={
    isUploaded:false
  }
  constructor(private storage: AngularFireStorage, public toast: ToastrService,
    public firestoreService: FirestoreService,) {}

  ngOnInit(): void {
  }
  onFileSelected(event:any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `category/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`category/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  addCategory=(categoryForm:NgForm)=>{
    this.firestoreService.add(Addcategory, categoryForm.form.value);
    this.toast.success('Data Saved Successfully.', 'Success!');
  }
}

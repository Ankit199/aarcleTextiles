import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
//import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  constructor(private storage: AngularFireStorage) {}

  ngOnInit(): void {
  }
  onFileSelected(event) {
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
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddnewProductFirePath } from 'src/app/Backend/Service/firestore.path';
import { FirestoreService } from 'src/app/Backend/Service/firestore.service';
import { SpinnerService } from 'src/app/shared/@spinner/spinner.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  EcommerceForm: any={
    Sku:""
  };
  isValidFormSubmitted:boolean=false;
  colorModel: string = '';
  EcommerceID: string | null;
  list: any = [];
  _colorList: any = [];
  imageUrl: any = [];
  galleryUrl: any = [];
  product: any;
  DescriptionList: any = [];
  constructor(
    public toast: ToastrService,
    public firestoreService: FirestoreService,
    private ref: ChangeDetectorRef,
    private spinner: SpinnerService
  ) {
    this.list = [
      { name: '28', checked: false },
      { name: '32', checked: false },
      { name: '34', checked: false },
    ];
    this.EcommerceForm.Sku=this.getUniqueId(3);

    // this.ref.detectChanges();
  }

  ngOnInit(): void {}
  shareCheckedList(item: any[]) {
    console.log(item);
  }
  shareIndividualCheckedList(item: any = {}) {
    console.log(item);
    this.list.forEach((x) => {
      if (x.name == item.name) {
        x.checked = item.checked;
      }
    });
    console.log(this.list);
  }

  _addProductDescription = (requestFrom, index?) => {
    if (requestFrom == 'I') {
      this.DescriptionList.push({ type: '', description: '' });
      return;
    }
    if (requestFrom == 'D') {
      return;
    }
  };
  addEcommerce(EcommerceForm: NgForm) {
    debugger
    console.table(EcommerceForm.value);
   // this.firestoreService.add(AddnewProductFirePath, EcommerceForm.form.value);
    //this.toast.success('Data Saved Successfully.', 'Success!');
  }
  getUniqueId(parts: number): string {
    const stringArr = [];
    for(let i = 0; i< parts; i++){
      // tslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }
  uploadFile(event: any, type: string) {
    this.spinner.showLoader();
    const id = Math.random().toString(36).substring(2);
    if (event && type) {
      if (type === 'image') {
       // alert('Image uploading..');
         this.toast.info("Image uploading..", "Wait!");
        if (event.target.files && event.target.files[0]) {
          var filesAmount = event.target.files.length;
          for (let i = 0; i < filesAmount; i++) {
            const uploadTask = this.firestoreService.uploadFileToStorage(
              `Ecommerce/Product/${id}`,
              event.target.files[i]
            );
            uploadTask.then().then(
              (snapshot) => {
                this.spinner.hideLoader();
                snapshot.ref.getDownloadURL().then((imageUrl: any) => {
                  this.imageUrl.push({ url: imageUrl });
                });
              },
              (reason) => {
                this.spinner.hideLoader();
                this.toast.error(
                  'Invalid image size/format. Please retry with correct image.',
                  'Error!'
                );
              }
            );
          }
          if (this.imageUrl.length > 0) {
            this.toast.success('Image uploaded', 'Success!');
          }
        }
      }
    }
  }

  
  colorchange = () => {
    // this.colorModel = (document.getElementById(
    //   'colour'
    // ) as HTMLInputElement).value;
    // console.log(this.colorModel);
    // (document.getElementById(
    //   'color_front'
    // ) as HTMLInputElement).style.backgroundColor = (document.getElementById(
    //   'colour'
    // ) as HTMLInputElement).value;
  };
  addColor = (): void => {
    if (this.colorModel !== '') {
      this._colorList.push(this.colorModel);
      this.colorModel = '';
    } else {
    }
  };
}

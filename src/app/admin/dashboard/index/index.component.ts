import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddnewProductFirePath } from 'src/app/Backend/Service/firestore.path';
import { FirestoreService } from 'src/app/Backend/Service/firestore.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  EcommerceForm:any;
  EcommerceID: string | null;
  list: any = [];
  product:any;
  DescriptionList: any = [];
  constructor(public firestoreService: FirestoreService,private ref: ChangeDetectorRef) {
    this.list = [
      { name: '28', checked: false },
      { name: '32', checked: false },
      { name: '34', checked: false },
    ];
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
    debugger;
    console.table(EcommerceForm.value)
    this.firestoreService.add(AddnewProductFirePath, EcommerceForm.form.value);
    alert("Data Added");
  }
}

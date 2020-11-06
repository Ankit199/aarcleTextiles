import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  list: any = [];
  product:any;
  DescriptionList: any = [];
  constructor() {
    this.list = [
      { name: 'L', checked: false },
      { name: 'M', checked: false },
      { name: 'S', checked: false },
    ];
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
}

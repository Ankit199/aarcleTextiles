import { Component, OnInit, Input } from '@angular/core';
import { Loader } from './loader.model';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  @Input() public id: string = 'global';
  public show: boolean;

  constructor(private loaderService: SpinnerService) {
  }

  public ngOnInit(): void {  
    this.loaderService.loaderStatus$.subscribe((response: Loader) => {
      this.show = this.id === response.id && response.status;
    });
  }
}
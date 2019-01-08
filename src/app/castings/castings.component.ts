import { Component } from '@angular/core';
import { localize } from "nativescript-localize";



@Component({
  selector: 'ns-castings',
  templateUrl: './castings.component.html',
  styleUrls: ['./castings.component.css'],
  moduleId: module.id,
})

export class CastingsComponent {

  public selectedIndex = 0;
  constructor() {}

  public onSelectedIndexChange(selectedIndex) {
    this.selectedIndex = selectedIndex;
  }

  onSwipe(args){
    if (args.direction === 1)
      this.selectedIndex = Math.abs(this.selectedIndex + 2 ) % 3
    if (args.direction === 2)
      this.selectedIndex = Math.abs(this.selectedIndex + 1) % 3 
  }

  
  deActivityIndicator() {
    // this.isLoading = true;
    console.log('hideActivityIndicator')
  }
  showActivityIndicator() {
    // this.isLoading = true;
    console.log('showActivityIndicator')
  }
}

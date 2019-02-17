import { Component, ViewChild, EventEmitter, Output, ElementRef, OnInit } from '@angular/core';
import { localize } from "nativescript-localize";
import { screen } from "platform";

import { alert } from "../shared";
import { AnimationCurve } from "ui/enums";
import { Casting} from "./casting.model";
import { CastingsService} from "./castings.service";

@Component({
  selector: 'ns-castings',
  templateUrl: './castings.component.html',
  styleUrls: ['./castings.component.css'],
  moduleId: module.id,
})

export class CastingsComponent implements OnInit{

  @ViewChild('tabHighlight') tabHighlight: ElementRef;
  @ViewChild('tab1') tab1: ElementRef;
  @ViewChild('tab2') tab2: ElementRef;
  @ViewChild('tab3') tab3: ElementRef;
  @Output() loading = new EventEmitter();
  @Output() loaded = new EventEmitter();

  selectedIndex = 0;
  listLoaded = false;

  private castings= [];
  private castingsTabNew= [];
  private castingsTabAudition= [];
  private castingsTabClose= [];
  private _isLoading = true;
  public store: CastingsService;

  constructor(  ) {
  }

  ngOnInit() {
    console.log('hello from CASTING component');

    // this.load();
  }

  load() {
    this.loading.next("");
    this.store.load()
    .subscribe(
      () => {
        this.loaded.next("");
        this.listLoaded = true;
        this.castings = this.store.getAllCastings()
        this.castingsTabNew = this.castings.filter(casting => casting.status === "New")
        this.castingsTabAudition = this.castings.filter(casting => casting.status === "Audition")
        this.castingsTabClose = this.castings.filter(casting => casting.status === "Close")
      },
       ()=> this.listLoaded = true
      );

  }

  public onSelectedIndexChange(index) {
    let previousTab = this.selectedIndex;
    // if (index != this.selectedIndex) {
    //   this.selectedIndex = index;
    //   this.tabHighlight.nativeElement.animate({
    //     translate: { x: index * screen.mainScreen.widthDIPs / 3, y: 0 },
    //     curve: AnimationCurve.cubicBezier(1, .02, .45, .93),
    //     duration: 300
    //   })
    //   // this.animateCurrentTab(this.getImage(index));
    //   // this.animatePreviousTab(this.getImage(previousTab));
    // }
  }
//   getImage(index) {
//     let currentTab;
//     switch (index) {
//       case 0:
//         currentTab = this.tab1;
//         break;
//       case 1:
//         currentTab = this.tab2;
//         break;
//       case 2:
//         currentTab = this.tab3;
//         break;
//       default:
//         break;
//     }
//     return currentTab;
//   }
// animateCurrentTab(arg){
//     arg.nativeElement.animate({
//       scale: { x: 1.2, y: 1.2 },
//       curve: AnimationCurve.cubicBezier(1, .02, .45, .93),
//       duration: 300
//     });
// }
// animatePreviousTab(arg){
//       arg.nativeElement.animate({
//       scale: { x: 1, y: 1 },
//       curve: AnimationCurve.cubicBezier(1, .02, .45, .93),
//       duration: 300
//     })
// }

  // onSwipe(args){
  //   if (args.direction === 1)
  //     this.onSelectedIndexChange(Math.abs(this.selectedIndex + 2 ) % 3)
  //   if (args.direction === 2)
  //     this.onSelectedIndexChange(Math.abs(this.selectedIndex + 1) % 3)
  // }

  deActivityIndicator() {
    // this.isLoading = true;
    console.log('hideActivityIndicator')
  }
  showActivityIndicator() {
    // this.isLoading = true;
    console.log('showActivityIndicator')
  }
}

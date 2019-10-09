import { Component, ViewChild, EventEmitter, Output, ElementRef, OnInit } from '@angular/core';

import { localize } from "nativescript-localize";
import { screen } from "platform";

import { AnimationCurve } from "ui/enums";
import { Color } from "color";
import { View } from "ui/core/view";

@Component({
  selector: 'ns-castings',
  templateUrl: './castings.component.html',
  styleUrls: ['./castings.component.scss'],
  moduleId: module.id,
})

export class CastingsComponent implements OnInit{

  @ViewChild('tabHighlight', {static: true}) tabHighlight: ElementRef;
  @ViewChild('tab1', {static: true}) tab1: ElementRef;
  @ViewChild('tab2', {static: true}) tab2: ElementRef;
  @ViewChild('tab3', {static: true}) tab3: ElementRef;
  @Output() loading = new EventEmitter();
  @Output() loaded = new EventEmitter();

  selectedIndex = 0;
  listLoaded = false;

  private castings= [];
  private castingsTabNew= [];
  private castingsTabAudition= [];
  private castingsTabClose= [];
  private _isLoading = true;
  private label = null;
  private tabs = [];

  constructor() {}

  ngOnInit() {
    this.tabs[0] = <View>this.tab1.nativeElement;
    this.tabs[1] = <View>this.tab2.nativeElement;
    this.tabs[2] = <View>this.tab3.nativeElement;
    this.tabs[0].className = "active"; // FIX 23/09
    // this.tabs[0].style.color = new Color("#00D796"); // FIX 23/09
  }

  public onSelectedIndexChange(index) {
    let previousTab = this.selectedIndex;
    if (index != this.selectedIndex) {
      this.tabs[index].className = "active"; // FIX 23/09
      this.tabs[previousTab].className = "not-active"; // FIX 23/09
      this.selectedIndex = index;
    }
  }

  animateCurrentTab(arg){
    arg.nativeElement.animate({
      scale: { x: 1.2, y: 1.2 },
      curve: AnimationCurve.cubicBezier(1, .02, .45, .93),
      duration: 300
    });
  }

  animatePreviousTab(arg){
    arg.nativeElement.animate({
      scale: { x: 1, y: 1 },
      curve: AnimationCurve.cubicBezier(1, .02, .45, .93),
      duration: 300
    })
  }

  onSwipe(args){
    if (args.direction === 1)
      this.onSelectedIndexChange(Math.abs(this.selectedIndex + 2 ) % 3)
    if (args.direction === 2)
      this.onSelectedIndexChange(Math.abs(this.selectedIndex + 1) % 3)
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

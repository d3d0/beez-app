import { Component, ViewChild, EventEmitter, Output, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { localize } from "nativescript-localize";
import { screen } from "platform";
import { AnimationCurve } from "ui/enums";
import { Color } from "color";
import { View } from "ui/core/view";

import { GridLayout } from 'tns-core-modules/ui/layouts/grid-layout/grid-layout';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout/stack-layout';
import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { Button } from "tns-core-modules/ui/button";


@Component({
  selector: 'ns-castings',
  templateUrl: './castings.component.html',
  styleUrls: ['./castings.component.scss'],
  moduleId: module.id,
})

export class CastingsComponent implements AfterViewInit, OnInit{

  @ViewChild('tabHighlight', {static: true}) tabHighlight: ElementRef;
  @ViewChild('tab1', {static: true}) tab1: ElementRef;
  @ViewChild('tab2', {static: true}) tab2: ElementRef;
  @ViewChild('tab3', {static: true}) tab3: ElementRef;
  @ViewChild('tabNew',{static: true}) tabNew: ElementRef;

  @Output() loading = new EventEmitter();
  @Output() loaded = new EventEmitter();

  selectedIndex = 0;
  listLoaded = false;
  castingNew = [];
  casting0: boolean = true;
  casting1: boolean = false;
  casting2: boolean = false;

  private castings= [];
  private castingsTabNew= [];
  private castingsTabAudition= [];
  private castingsTabClose= [];
  private _isLoading = true;
  private label = null;
  private tabs = []; // array di casting list component

  constructor() {}

  ngOnInit() {
    this.tabs[0] = <View>this.tab1.nativeElement;
    this.tabs[1] = <View>this.tab2.nativeElement;
    this.tabs[2] = <View>this.tab3.nativeElement;
    this.tabs[0].className = "active"; // FIX 23/09
    // this.tabs[0].style.color = new Color("#00D796"); // FIX 23/09
    
  }

  ngAfterViewInit() {
      //console.log('############################################ > ngAfterViewInit');
      //console.log('############################################ > ngAfterViewInit');

      // this.castingNew[0] = <StackLayout>this.tabNew.nativeElement;
      // console.log('############################################',this.castingNew[0]);

      //console.log('############################################ > ngAfterViewInit');
      //console.log('############################################ > ngAfterViewInit');
  }

  // STACKLAYOUT
  onLoadedStack(args: EventData) {
    let stack = <StackLayout>args.object;
    let oggetto = stack.getViewById('casting');
    let page: Page = stack.page;
    // console.log('LOADED STACK ############################################', page);
  }
  onUnloadedStack(args: EventData) {
    let stack = <StackLayout>args.object;
    let oggetto = stack.getViewById('casting');
    let page: Page = stack.page;
    // console.log('LOADED STACK ############################################', page);
  }
  // BUTTON
  onTap(args: EventData) {
      let button = args.object as Button;
      let native: Page = button.nativeView;
      let page: Page = button.page;
      // console.log('TAP ############################################',page);
  }
  onLoaded(args: EventData) {
      // let button = args.object;
      // console.log('LOADED ############################################',button);
  };
  onUnloaded(args: EventData) {
      // let button = args.object;
      // console.log('UNLOADED ############################################',button);
  };

  public onSelectedIndexChange(index, args: EventData) {
    // console.log('STO SWITCHANDO!');
    // console.log(args.object);
    // let grid = <GridLayout>args.object;
    // let page: Page = grid.page;
    // let listView = page.getViewById("id");

    let previousTab = this.selectedIndex;
    if (index != this.selectedIndex) {
      this.tabs[index].className = "active"; // FIX 23/09
      this.tabs[previousTab].className = "not-active"; // FIX 23/09
      this.selectedIndex = index;
      // d3d0 fix --> loading casting on index change
      console.log('STO SWITCHANDO!', index);
      if(index == 0) {
        this.casting0 = true;
        this.casting1 = false;
        this.casting2 = false;
      }
      if(index == 1) {
        this.casting0 = false;
        this.casting1 = true;
        this.casting2 = false;
      }
      if(index == 2) {
        this.casting0 = false;
        this.casting1 = false;
        this.casting2 = true;
      }
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
      this.onSelectedIndexChange(Math.abs(this.selectedIndex + 2 ) % 3, args)
    if (args.direction === 2)
      this.onSelectedIndexChange(Math.abs(this.selectedIndex + 1) % 3, args)
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

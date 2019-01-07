import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { localize } from "nativescript-localize";
import { RouterExtensions } from "nativescript-angular/router";
import { SegmentedBarItem } from "tns-core-modules/ui/segmented-bar";
import { View } from "ui/core/view";
import { Page } from "tns-core-modules/ui/page";
import { Animation } from "ui/animation";
import { AnimationCurve } from "tns-core-modules/ui/enums";
import { ScrollView, ScrollEventData } from 'tns-core-modules/ui/scroll-view';
import { screen } from 'tns-core-modules/platform';

import { GestureTypes, SwipeGestureEventData } from "tns-core-modules/ui/gestures";
import labelModule = require("tns-core-modules/ui/label");

@Component({
  selector: 'ns-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  moduleId: module.id,
})

export class ProfileComponent implements OnInit {

  static IMAGE_MIN_HEIGHT = 48;
  public selectedIndex = 0;
  public polariud : ElementRef;
  private tabItems: SegmentedBarItem[];
  @ViewChild("tabButtons") tabButtons: ElementRef;
  @ViewChild("polaroid") polaroid: ElementRef;

  constructor(private routerExtension: RouterExtensions, private page: Page) {
    console.log('hello from PROFILE component');
    this.tabItems = [];
    const item1 = <SegmentedBarItem>new SegmentedBarItem();
    item1.title = localize("PROFILE.INFO");
    this.tabItems.push(item1);
    const item2 = <SegmentedBarItem>new SegmentedBarItem();
    item2.title = localize("PROFILE.CONTACTS");
    this.tabItems.push(item2);
    const item3 = <SegmentedBarItem>new SegmentedBarItem();
    item3.title = localize("PROFILE.DETAILS");
    this.tabItems.push(item3);
    const item4 = <SegmentedBarItem>new SegmentedBarItem();
    item4.title = localize("PROFILE.SETTINGS");
    this.tabItems.push(item4);
  }

  ngOnInit() {}

  onSwipe(args){
    if (args.direction === 1)
      this.selectedIndex = Math.max(0,(this.selectedIndex - 1) % 4)
    if (args.direction === 2)
      this.selectedIndex = Math.max(0,(this.selectedIndex + 1) % 4)
    console.log(this.selectedIndex)
  }

  get minHeight() {
    return screen.mainScreen.heightDIPs + 2 * screen.mainScreen.widthDIPs;
  }

  onScroll(event: ScrollEventData, scrollView: ScrollView) {
      // If the header content is still visiible
      let polaroid = <View>this.polaroid.nativeElement;
      // this.flex.getMeasuredHeight()
      // console.log(scrollView.verticalOffset);
      if (scrollView.verticalOffset < 250) {
          const offset = scrollView.verticalOffset / 2;
          if (scrollView.ios) {
              // iOS adjust the position with an animation to create a smother scrolling effect. 
              polaroid.animate({ translate: { x: 0, y: offset } }).then(() => { }, () => { });
          } else {
              // Android, animations are jerky so instead just adjust the position without animation.
              polaroid.translateY = Math.floor(offset);
              // polaroid.marginTop = (scrollView.verticalOffset*8)*-1;
          }
      }
  }


  public onScrollooo(args: ScrollEventData) {


    // let tabButtons = <View>this.tabButtons.nativeElement;      
    // this.showPolaroid()
     // if (this.tabButtonsEl  )
                /* Check if the first item is already reached to top.
                if (listView.getFirstVisiblePosition() == 0) {
                    View firstChild = listView.getChildAt(0);
                    int topY = 0;
                    if (firstChild != null) {
                        topY = firstChild.getTop();
                    }
                    int heroTopY = stickyViewSpacer.getTop();
                    stickyView.setY(Math.max(0, heroTopY + topY));
                    heroImageView.setY(topY * 0.5f);
                }
                */
    // this.tabButtonsEl.style.marginTop = args.scrollY;
    // this.tabButtonsEl.style.marginBottom = Math.max(0,(args.scrollY)*-1 + 450);
};


  showPolaroid(){
    let animations = [];
    let polaroidEl = <View>this.polaroid.nativeElement;


      // Fade in the main container and logo over one half second.
      animations.push({ target: polaroidEl, scale: { x: 2, y: 2 },curve: AnimationCurve.linear, opacity: 0, delay: 500, duration: 1500 });
      animations.push({ target: polaroidEl, translate: { x: 0, y: -1000 },curve: AnimationCurve.linear, opacity: 0, delay: 500, duration: 1500 });

      animations.push({ target: polaroidEl, scale: { x: 1, y: 1 },curve: AnimationCurve.linear, delay: 2500, duration: 1500 });
      animations.push({ target: polaroidEl, translate: { x: 0, y: 0 },curve: AnimationCurve.linear, opacity: 1,  delay: 2500, duration: 1500 });
      // animations.push({ target: logoContainer, opacity: 1, duration: 500 });
                // scale: { x: 1.2, y: 1.2 },
                // duration: 200,
                // curve: AnimationCurve.spring,
                // target: view
      // Slide up the form controls and sign up container.
      // animations.push({ target: signUpStack, translate: { x: 0, y: 0 }, opacity: 1, delay: 500, duration: 150 });
      // animations.push({ target: formControls, translate: { x: 0, y: 0 }, opacity: 1, delay: 650, duration: 150 });

      // Kick off the animation queue
      new Animation(animations, false).play();
  }

  public onSelectedIndexChange(selectedIndex) {
    this.selectedIndex = selectedIndex;
  }

  goToSettings() {
    this.routerExtension.navigate(["/settings"]);
  }

  hideActivityIndicator() {
    // this.isLoading = true;
    console.log('hideActivityIndicator')
  }

  showActivityIndicator() {
    // this.isLoading = true;
    console.log('showActivityIndicator')
  }
}

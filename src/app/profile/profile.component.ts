import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { View } from "ui/core/view";
import { Page } from "tns-core-modules/ui/page";
import { Animation } from "ui/animation";
import { AnimationCurve } from "tns-core-modules/ui/enums";
import { ScrollView, ScrollEventData } from 'tns-core-modules/ui/scroll-view';
import { screen } from 'tns-core-modules/platform';
import { GestureTypes, SwipeGestureEventData } from "tns-core-modules/ui/gestures";
import { Observable } from 'rxjs';

import { ProfileService } from "./profile.service"
@Component({
  selector: 'ns-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  moduleId: module.id,
})

export class ProfileComponent implements OnInit {

  static IMAGE_MIN_HEIGHT = 48;
  public selectedIndex = 0;
  private tabs = [];
  private _profile= {}

  @ViewChild("tabButtons") tabButtons: ElementRef;
  @ViewChild("polaroid") polaroid: ElementRef;
  @ViewChild('tabHighlight') tabHighlight: ElementRef;
  @ViewChild("tab1") tab1: ElementRef;
  @ViewChild("tab2") tab2: ElementRef;
  @ViewChild("tab3") tab3: ElementRef;
  @ViewChild("tab4") tab4: ElementRef;

  constructor(private routerExtension: RouterExtensions, private profileService: ProfileService,private page: Page) {
    console.log('hello from PROFILE component');

  }
  get profile(){
    return  this._profile
  }
  ngOnInit(): void {
    this.profileService.load().subscribe(profile=> this._profile = profile[0])
    this.tabs[0] = <View>this.tab1.nativeElement;
    this.tabs[1] = <View>this.tab2.nativeElement;
    this.tabs[2] = <View>this.tab3.nativeElement;
    this.tabs[3] = <View>this.tab4.nativeElement;
    this.tabs[0].className = "active";
  }

  ngAfterViewInit() {
    setTimeout(() => { this.animateCurrentTab(this.tab1); }, 100);
  }

  public onSelectedIndexChange(index) {
    let previousTab = this.selectedIndex;
    if (index != this.selectedIndex) {
      this.tabs[index].className = "active";
      this.tabs[previousTab].className = "not-active";
      this.selectedIndex = index;
      this.tabHighlight.nativeElement.animate({
        translate: { x: index * screen.mainScreen.widthDIPs / 4, y: 0 },
        curve: AnimationCurve.cubicBezier(1, .02, .45, .93),
        duration: 300
      })
      // this.animateCurrentTab(this.getImage(index));
      // this.animatePreviousTab(this.getImage(previousTab));
    }
  }

  getImage(index) {
    let currentTab ;
    switch (index) {
      case 0:
        currentTab = this.tab1;
        break;
      case 1:
        currentTab = this.tab2;
        break;
      case 2:
        currentTab = this.tab3;
        break;
      default:
        break;
    }
    return currentTab;
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
      this.onSelectedIndexChange( Math.abs(this.selectedIndex + 3 ) % 4 )
    if (args.direction === 2)
      this.onSelectedIndexChange( Math.abs(this.selectedIndex + 1) % 4 )
  }

  get minHeight() {
    return screen.mainScreen.heightDIPs + 2 * screen.mainScreen.widthDIPs;
  }

  onScroll(event: ScrollEventData, scrollView: ScrollView) {
      // If the header content is still visiible
      let polaroid = <View>this.polaroid.nativeElement;
      // this.flex.getMeasuredHeight()
      // console.log(scrollView.verticalOffset);

      /*
      if (scrollView.verticalOffset < 250) {
          const offset = scrollView.verticalOffset / 2;
          if (scrollView.ios) {
              // iOS adjust the position with an animation to create a smother scrolling effect.
              polaroid.animate({ translate: { x: 0, y: offset } }).then(() => { }, () => { });
          } else {
              // Android, animations are jerky so instead just adjust the position without animation.
              polaroid.translateY = Math.floor(offset);
          }
      }
      */
  }

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

  goToSettings() {
    this.routerExtension.navigate(["/home/profile/settings"]);
  }

  hideActivityIndicator() {
    // this.isLoading = true;
    console.log('hideActivityIndicator')
  }
  edit(profile){
    profile.name="mirko modificato"
    profile.surname="mirko modificato"
    this.profileService.edit(profile).subscribe(result=>console.log(result))
  }

  showActivityIndicator() {
    // this.isLoading = true;
    console.log('showActivityIndicator')
  }
}

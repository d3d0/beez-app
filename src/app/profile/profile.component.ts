import { Component, ViewChild, ViewContainerRef, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { View } from "ui/core/view";
import { Page } from "tns-core-modules/ui/page";
import { Animation } from "ui/animation";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/directives/dialogs";
import { AnimationCurve } from "tns-core-modules/ui/enums";
import { ScrollView, ScrollEventData } from 'tns-core-modules/ui/scroll-view';
import { screen } from 'tns-core-modules/platform';
import { GestureTypes, SwipeGestureEventData } from "tns-core-modules/ui/gestures";
import { Observable } from 'rxjs';
import { localize } from "nativescript-localize";
import { BackendService } from "../shared/backend.service";
import { MessageModalViewComponent } from "../components/message-modal-view/message-modal-view.component";
import { alert, getIconSource } from "../shared/utils";
import { ProfileService } from "./profile.service";


@Component({
  selector: 'ns-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  moduleId: module.id,
})

export class ProfileComponent implements AfterViewInit, OnInit{

  static IMAGE_MIN_HEIGHT = 48;
  public selectedIndex = 0;
  public editable = false;
  private tabs = [];
  public isLoading: boolean = false;
  private _profile= {};
  private hint: string = '';

  @ViewChild("tabButtons", {static: false}) tabButtons: ElementRef;
  @ViewChild("polaroid", {static: false}) polaroid: ElementRef;
  @ViewChild("profileTabs", {static: false}) profileTabs: ElementRef;
  @ViewChild('tabHighlight', {static: false}) tabHighlight: ElementRef;
  @ViewChild("tab1", {static: true}) tab1: ElementRef;
  @ViewChild("tab2", {static: true}) tab2: ElementRef;
  @ViewChild("tab3", {static: true}) tab3: ElementRef;
  @ViewChild("tab4", {static: true}) tab4: ElementRef;
  // @ViewChild("fieldAltezza", {static: true}) fieldAltezza: BeezInlineTextfield;
  // @ViewChild(BeezInlineTextfield, {static: true}) fieldAltezza: BeezInlineTextfield;


  constructor(
    private routerExtension: RouterExtensions,
    private vcRef: ViewContainerRef,
    private modal: ModalDialogService, 
    private profileService: ProfileService,
    private page: Page) {
    console.log('hello from PROFILE component');
    
  }
  
  ngOnInit(): void {
    this.loadProfile();
    
    this.tabs[0] = <View>this.tab1.nativeElement;
    this.tabs[1] = <View>this.tab2.nativeElement;
    this.tabs[2] = <View>this.tab3.nativeElement;
    this.tabs[3] = <View>this.tab4.nativeElement;
    this.tabs[1].className = "active";

    //console.log(this.tabs[0].className);

    // if (BackendService.showProfilePopup()) {  
    //   setTimeout(() => {
    //     console.log('popup profile')
    //     const options: ModalDialogOptions = {
    //         context: { message: localize('POPUP_TEXT') , buttonText: localize('POPUP_BUTTON'), title: localize('POPUP_TITLE'), footer: localize('POPUP_FOOTER')},
    //         fullscreen: true,
    //         viewContainerRef: this.vcRef
    //       };
    //       this.modal.showModal(MessageModalViewComponent, options)
    //           })
    //     }
  }

  ngAfterViewInit() {
    this.tabs[0].className = "active";
  }

  get profile(){
    return this._profile;
  }

  textfieldEvent(text, field){
    if(field) {
      this.profile[field]=text;
    }
  }

  selectEvent(text, field){
    console.log('l☯☯☯l > ProfileComponent > selectEvent > select value:',text);
    console.log('l☯☯☯l > ProfileComponent > selectEvent > select field:',field);
    if(field){
      if(text.tid) { // select > taxonomy !!!
        this.profile[field]=text.tid;
        console.log('selectEvent taxonomy > this.profile[field]', this.profile[field]);
        console.log('selectEvent taxonomy > text', text);
        console.log('selectEvent taxonomy > tid', text.tid);
        console.log('selectEvent taxonomy > name', text.name);
      }
      else { // select > datepicker !!!
        this.profile[field]=text;
        console.log('selectEvent datepicker > this.profile[field]', this.profile[field]);
        console.log('selectEvent datepicker > text', text);
        console.log('selectEvent datepicker > tid', text.tid);
        console.log('selectEvent datepicker > name', text.name);
      }
      // if(field === 'date_of_birth') {
      //   this.profile[field] = text.getFullYear() + "-" + (text.getMonth() + 1) + "-" + text.getDate();
      //   console.log(this.profile[field]);
      // }
    }
  }

  editCancel(){
    this.isLoading = true;
    this.profileService.load().subscribe(profile=> {
      this._profile = profile[0]
      this.isLoading = false
      this.editable = false
    })
  }

  editSave(){
    this.isLoading = true;

    console.log('l☯☯☯l > ProfileComponent > editSave() > this.user: ', this.profile);
    
    this.profileService.edit(this.profile).subscribe((result) => {
      // alert('Profilo aggiornato!');
      console.log('l☯☯☯l > ProfileComponent > edit() > Profilo aggiornato!',result);
      console.log('l☯☯☯l > ProfileComponent > edit() > Profilo aggiornato!',this.profile);
      this.isLoading = false;
      this.editable = false;
    },
    (err) => {
      console.log(err);
      alert(localize('MESSAGES.ERROR_SERVICE'))
    });
    this.isLoading = false;
    this.editable = false;
  }

  toogleEditable(){
    this.editable = !this.editable
  }

  loadProfile(){
    this.profileService.load().subscribe(profile=> {
      this._profile = profile[0];

      // stampa dati profilo
      // console.log('l☯☯☯l > ProfileComponent > loadProfile() > _profile: ', this._profile);
      
      // if(this._profile['date_of_birth']!=null) {
      //   this._profile['date_of_birth'] = new Date(this._profile['date_of_birth']).toISOString();
      // }
      if (this._profile['facebook']==null) {
        this._profile['facebook_hint'] = 'username';
      }
      if (this._profile['instagram']==null) {
        this._profile['instagram_hint'] = 'username';
      }
      if (this._profile['linkedin']==null) {
        this._profile['linkedin_hint'] = 'username';
      }
    });
  }

  public onSelectedIndexChange(index) {
    console.log(index);
    if (this.editable){
      return
    } 
    let previousTab = this.selectedIndex;
    if (index != this.selectedIndex) {
      this.tabs[index].className = "active"; // FIX 23/09
      this.tabs[previousTab].className = "not-active"; // FIX 23/09
      this.selectedIndex = index;
      // this.tabHighlight.nativeElement.animate({
      //     translate: { x: index * screen.mainScreen.widthDIPs / 4, y: 0 },
      //     curve: AnimationCurve.cubicBezier(1, .02, .45, .93),
      //     duration: 300
      //   });
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
      this.onSelectedIndexChange( Math.abs(this.selectedIndex + 3 ) % 4 )
    if (args.direction === 2)
      this.onSelectedIndexChange( Math.abs(this.selectedIndex + 1) % 4 )
  }

  get minHeight() {
    return screen.mainScreen.heightDIPs + 2 * screen.mainScreen.widthDIPs;
  }

  onScroll(event: ScrollEventData, scrollView: ScrollView) {
    let polaroid = <View>this.polaroid.nativeElement;
  }

  showPolaroid(){
    let animations = [];
    let tabsEl = <View>this.profileTabs.nativeElement;
    if (this.editable){
      animations.push({ target: tabsEl, translate: { x: 0, y:  -300 },curve: AnimationCurve.linear,  delay: 0, duration: 900 });
    } else {
      animations.push({ target: tabsEl, translate: { x: 0, y: 0 },curve: AnimationCurve.linear, delay: 0, duration: 900 });
    }
    new Animation(animations, false).play();
  }

  goToSettings() {
    this.routerExtension.navigate(["/home/profile/settings"]);
  }

  edit(profile){
    this.profileService.edit(profile).subscribe(result=>console.log(result))
  }


}

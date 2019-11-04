import { Component, ViewChild, ElementRef, ViewContainerRef, OnInit, AfterViewInit, ViewChildren, QueryList } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/directives/dialogs";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";
import { localize } from "nativescript-localize";
import { EventData, Observable } from "tns-core-modules/data/observable";
import { AppModule } from "../app.module";
import { BackendService } from "../shared/backend.service";
import { TaxonomyService } from "../shared/taxonomy.service";
import { MessageModalViewComponent } from "../components/message-modal-view/message-modal-view.component";
import * as app from "tns-core-modules/application";
import { isIOS, isAndroid } from "tns-core-modules/platform";
import { screen } from 'platform';
import { AnimationCurve } from "ui/enums";
import { GridLayout } from "ui/layouts/grid-layout";
import { SelectedIndexChangedEventData } from "tns-core-modules/ui/tab-view";
import { PanGestureEventData, GestureStateTypes, GestureEventData } from "ui/gestures";
import { Label } from "tns-core-modules/ui/label";
import { Color } from "color";
import { NotificationsService} from "../notifications/notifications.service";


export function onLayoutChanged(args: EventData) {
  console.log(args.eventName);
  console.log(args.object);
}

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  moduleId: module.id,
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild("homeTabs", { static: false }) homeTabs: ElementRef;
  @ViewChild('tabs', { static: true }) tabs: ElementRef;
  @ViewChild('tabBGContainer', { static: true }) tabBGContainer: ElementRef;
  @ViewChildren('tabContents', { read: ElementRef }) tabContents: QueryList<ElementRef>;
  
  // Tab Contents and Properties
  tabContainer = {
      backgroundColor: '#fff',
      focusColor: '#fff'
  };
  tabList: { text: string, icon: string, color?: string, backgroundColor: string, fadeColor?: string }[] = [
      { text: String.fromCharCode(0xf080), icon: 'res://casting_on', backgroundColor: '#000000', color: '#000' },
      { text: String.fromCharCode(0xf075), icon: 'res://notification_on', backgroundColor: '#FFFFFF', color: '#000' },
      { text: String.fromCharCode(0xf259), icon: 'res://profile_on', backgroundColor: '#FFFFFF', color: '#000' }
  ];
  currentTabIndex: number = 0;
  defaultSelected: number = 0;
  prevDeltaX: number = 0;
  animationCurve = AnimationCurve.cubicBezier(.38, .47, 0, 1);
  public contatore: string = '';

  constructor(
    private notificationService: NotificationsService,
    private routerExtension: RouterExtensions,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private taxonomyService: TaxonomyService,
    private vcRef: ViewContainerRef,
    private modal: ModalDialogService,
    private page: Page) {
    this.taxonomyService.load();
  }

  ngOnInit(): void {
    console.log('☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯');
    console.log('l☯☯☯l > HomeComponent > ngOnInit()');
    console.log('☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯');

    this.routerExtension.navigate([{ outlets: { castingsTab: ["castings"], notificationsTab: ["notifications"], profileTab: ["profile"] } }], { relativeTo: this.activeRoute });
    this.page.actionBarHidden = true;

    if (BackendService.firstLogin()) {
      setTimeout(() => {
        const options: ModalDialogOptions = {
          context: { message: localize('WELCOME_TEXT') , buttonText: localize('WELCOME_BUTTON'), title: localize('WELCOME_TITLE'), footer: localize('WELCOME_FOOTER')},
          fullscreen: true,
          viewContainerRef: this.vcRef
        };
        this.modal.showModal(MessageModalViewComponent, options)
      })
    } 
  }

  // --------------------------------------------------------------------
  // Hooks

  ngAfterViewInit() {
    console.log('☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯');
    console.log('l☯☯☯l > HomeComponent > ngAfterViewInit()');
    console.log('☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯');

    this.initializeTabBar();

    // DOCS > inizializzo contatore
    this.notificationService.getCount().subscribe(data => {
      console.log('l☯☯☯l > ngAfterViewInit() > NotificationService > getCount() > data[0] ', data[0]);
      this.notificationService.counterSubject.next(data[0]);
    },
    error => {
      console.log('error', error);
    });
    this.notificationService._counter.subscribe((data) => {
      console.log('l☯☯☯l > ngAfterViewInit() > NotificationService > Subscriber got NOTIFICATIONS count >>>>>> '+ data);
      this.contatore = data;
    });
  }

  onLoadedNav(args: EventData) {
    console.log ('l☯☯☯l > HomeComponent > onLoadedNav()', this.defaultSelected);
  }

  // --------------------------------------------------------------------
  // User Interaction

  // MY: Tabs selected index is changed, e.g. when swipe to navigate.
  onSelectedIndexChanged(args: SelectedIndexChangedEventData): void {
      if (args.newIndex !== this.currentTabIndex) {
          this.onBottomNavTap(args.newIndex);
      }
  }

  // Tap on a one of the tabs
  onBottomNavTap(index: number, duration: number = 300): void {
    
      if (this.currentTabIndex !== index) {
          const tabContentsArr = this.tabContents.toArray();

          // set unfocus to previous index
          tabContentsArr[this.currentTabIndex].nativeElement.animate(this.getUnfocusAnimation(this.currentTabIndex, duration));

          // set focus to current index
          tabContentsArr[index].nativeElement.animate(this.getFocusAnimation(index, duration));
      }

      // MY: Change the selected index of Tabs when tap on tab strip
      if (this.tabs.nativeElement.selectedIndex !== index) {
          this.tabs.nativeElement.selectedIndex = index;

          // DOCS > update contatore
          this.notificationService.getCount().subscribe(data => {
            console.log('l☯☯☯l > onBottomNavTap() > NotificationService > getCount() > data[0] ', data[0]);
            this.notificationService.counterSubject.next(data[0]);
          },
          error => {
            console.log('error', error);
          });
      }

      // set current index to new index
      this.currentTabIndex = index;
  }

  
  // --------------------------------------------------------------------
  // Tab bar helpers

  badgeLoaded(args: EventData) {
    console.log('badge loaded');
    const label = args.object as Label;
    console.log('badge loaded', label);

    if(isIOS) {
      const layer = label.ios.layer;
      // layer.backgroundColor = UIColor.blueColor.CGColor; // works!
      layer.backgroundColor = new Color('#5A82FF').ios.CGColor; // works!
      layer.shadowOffset = CGSizeMake(0, 1);
      layer.shadowOpacity = 0.3;
      layer.shadowRadius = 7;
      layer.cornerRadius = 8;
      
      // You can also specify the shadow colour;
      // (i.e. layer.shadowColor = UIColor.yellowColor.CGColor)
      // But it will default to black if not set.
      
    }
  }

  initializeTabBar(): void {

      this.tabBGContainer.nativeElement.width = screen.mainScreen.widthDIPs; // d3d0 add!

      // set default selected tab
      const tabContentsArr = this.tabContents.toArray();
      tabContentsArr[this.defaultSelected].nativeElement.scaleX = 1.2;
      tabContentsArr[this.defaultSelected].nativeElement.scaleY = 1.2;
      tabContentsArr[this.defaultSelected].nativeElement.translateY = 0;
      this.currentTabIndex = this.defaultSelected;
  }

  getSlideAnimation(index: number, duration: number) {
      return {
          translate: { x: this.getTabTranslateX(index), y: 0 },
          curve: this.animationCurve,
          duration: duration
      };
  }

  getFocusAnimation(index: number, duration: number) {
      return {
          scale: { x: 1.2, y: 1.2 },
          translate: { x: 0, y: 0 },
          duration: duration
      };
  }

  getUnfocusAnimation(index: number, duration: number) {
      return {
          scale: { x: 1, y: 1 },
          translate: { x: 0, y: 0 },
          duration: duration
      };
  }

  getTabTranslateX(index: number): number {
      return index * screen.mainScreen.widthDIPs / this.tabList.length - (screen.mainScreen.widthDIPs / 2) + (80 / 2)
  }

  getIconSource(icon: string): string {
    const iconPrefix = isAndroid ? "res://" : "res://tabIcons/";
    return iconPrefix + icon;
  }
}

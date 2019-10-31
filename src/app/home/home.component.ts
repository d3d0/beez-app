import { Component, ViewChild, ElementRef, ViewContainerRef, OnInit, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/directives/dialogs";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";
import { localize } from "nativescript-localize";
import { EventData } from "tns-core-modules/data/observable";

import { AppModule } from "../app.module";
import { BackendService } from "../shared/backend.service";
import { TaxonomyService } from "../shared/taxonomy.service";
import { MessageModalViewComponent } from "../components/message-modal-view/message-modal-view.component";

import * as app from "tns-core-modules/application";
import {isIOS, isAndroid} from "tns-core-modules/platform";
import { BottomNavigationBar, BottomNavigationTab, TabSelectedEventData } from 'nativescript-material-bottomnavigationbar';




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

  tabs: any;

  constructor(
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

    // this.homeTabs = this.homeTabs.nativeElement;
    // console.log('Loading homeTabs', this.homeTabs);
    // var myTabView = page.getViewById("myTabView");
    // var tabItem = myTabView.ios.tabBar.items[0];
    // tabItem.badgeValue = "5";

    // this.routerExtension.navigate([{ outlets: { castingsTab: ["castings"], notificationsTab: ["notifications"], profileTab: ["profile"] } }], { relativeTo: this.activeRoute });
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
   
    /**
     * BottomNavigationBar > showBadge()
     */
    // this.tabs.showBadge(0,1);
    // this.tabs.showBadge(1,1);
    // this.tabs.showBadge(2,1);
    // this.tabs.selectTab(1);
    // this.tabs = [
    //   new BottomNavigationTab(),
    //   new BottomNavigationTab()
    // ];
    
  }


  ngAfterViewInit() {
    // DOCS:
    // https://stackoverflow.com/questions/36305114/add-a-badge-in-a-tabview

    // console.log("ngAfterViewInit homeTabs: " + this.homeTabs.nativeElement);
    // if (isIOS) {
      // var tabItem = this.homeTabs.nativeElement.ios.tabBar.items[0];
      // var tabItem = this.homeTabs.nativeElement.ios.tabBar.items;
      // var tabItem = this.homeTabs.nativeElement.ios.tabBar;
      // console.log("ngAfterViewInit homeTabs tabItem: " + tabItem);
      // tabItem.badgeValue = "1";
    // }
  }

  /**
   * BottomNavigationBar > onBottomNavigationBarLoaded()
   */
  onBottomNavigationBarLoaded(args: EventData) { 
    console.log('tab loaded ' + args.object);
    const bar = args.object as BottomNavigationBar; 
    bar.selectTab(2); // works!
    // bar.showBadge(0,1,); // bug!
  }

  /**
   * BottomNavigationBar > onBottomNavigationTabSelected()
   */
  onBottomNavigationTabSelected(args: TabSelectedEventData) {
    console.log('tab selected ' + args.newIndex);
    // routing
    if(args.newIndex == 0) { this.router.navigate(["/home/default/castings"]);} 
    if(args.newIndex == 1) { this.router.navigate(["/home/default/notifications"]);} 
    if(args.newIndex == 2) { this.router.navigate(["/home/default/profile"]);} 
    // this.router.navigate(['/home/default', { outlets: { castingsTab: ['castings'] } }])
  }

  getIconSource(icon: string): string {
    const iconPrefix = isAndroid ? "res://" : "res://tabIcons/";
    return iconPrefix + icon;
  }
}

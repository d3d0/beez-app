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

  constructor(
    private routerExtension: RouterExtensions,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private taxonomyService: TaxonomyService,
    private vcRef: ViewContainerRef,
    private modal: ModalDialogService,
    private page: Page) {
    // warmup taxonomyService
    this.taxonomyService.load();
  }

  ngOnInit(): void {

    // this.homeTabs = this.homeTabs.nativeElement;
    console.log('Loading homeTabs', this.homeTabs);

    // var myTabView = page.getViewById("myTabView");
    // var tabItem = myTabView.ios.tabBar.items[0];
    // tabItem.badgeValue = "5";

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

  ngAfterViewInit() {
    console.log("ngAfterViewInit homeTabs: " + this.homeTabs.nativeElement);
    if (isIOS) {
      // var tabItem = this.homeTabs.nativeElement.ios.tabBar.items[0];
      // var tabItem = this.homeTabs.nativeElement.ios.tabBar.items;
      // var tabItem = this.homeTabs.nativeElement.ios.tabBar;
      // console.log("ngAfterViewInit homeTabs tabItem: " + tabItem);
      // tabItem.badgeValue = "1";
    }
  }

  getIconSource(icon: string): string {
    const iconPrefix = isAndroid ? "res://" : "res://tabIcons/";
    return iconPrefix + icon;
  }
}

import { Component, ViewContainerRef, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/directives/dialogs";
import { RouterExtensions } from "nativescript-angular/router";
import { isAndroid } from "tns-core-modules/platform";
import { Page } from "ui/page";
import { localize } from "nativescript-localize";
import { EventData } from "tns-core-modules/data/observable";

import { AppModule } from "../app.module";
import { BackendService } from "../shared/backend.service";
import { TaxonomyService } from "../shared/taxonomy.service";
import { MessageModalViewComponent } from "../components/message-modal-view/message-modal-view.component";

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
export class HomeComponent implements OnInit {

  constructor(
    private routerExtension: RouterExtensions,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private taxonomyService: TaxonomyService,
    private vcRef: ViewContainerRef,
    private modal: ModalDialogService,
    private page: Page) {
    /// warmup taxonomyService
    this.taxonomyService.load()
  }

  ngOnInit(): void {
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

  getIconSource(icon: string): string {
    const iconPrefix = isAndroid ? "res://" : "res://tabIcons/";
    return iconPrefix + icon;
  }
}

import { Component, ViewContainerRef,OnInit } from "@angular/core";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/directives/dialogs";
import { RouterExtensions } from "nativescript-angular/router";
import { EventData } from "tns-core-modules/data/observable";
import { ActivatedRoute } from "@angular/router";
import { confirm } from "ui/dialogs";
import { Page } from "ui/page";
import { isAndroid } from "tns-core-modules/platform";
import { Router, CanActivate } from "@angular/router";
import { AppModule } from "../app.module";

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  moduleId: module.id,
})
export class HomeComponent implements OnInit {

    constructor(
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private routerExtension: RouterExtensions,
        private activeRoute: ActivatedRoute,
        private router: Router,
        private page: Page) {
        // this.page.actionBarHidden = true;
    }

    ngOnInit(): void {
        // this.routerExtension.navigate([{ outlets: { castingsTab: ["castings"] } }], { relativeTo: this.activeRoute });
        // Init your component properties here.
        console.log('hello from HOME component')
        this.routerExtension.navigate([{ outlets: { castingsTab: ["castings"], notificationsTab: ["notifications"], profileTab: ["profile"] } }], { relativeTo: this.activeRoute });
    }

    getIconSource(icon: string): string {
        const iconPrefix = isAndroid ? "res://" : "res://tabIcons/";
        return iconPrefix + icon;
    }
}

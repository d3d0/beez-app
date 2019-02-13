import { Component, ViewContainerRef,OnInit } from "@angular/core";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/directives/dialogs";
import { RouterExtensions } from "nativescript-angular/router";
import { EventData } from "tns-core-modules/data/observable";
import { ActivatedRoute } from "@angular/router";
import { isAndroid } from "tns-core-modules/platform";
import { AppModule } from "../app.module";
import { Page } from "ui/page";
import { BackendService } from "../shared/backend.service";

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  moduleId: module.id,
})
export class HomeComponent implements OnInit {

    constructor(
        private routerExtension: RouterExtensions,
        private activeRoute: ActivatedRoute,
        private page: Page) {
    }

    ngOnInit(): void {
      // BackendService.printAll()
        this.routerExtension.navigate([{ outlets: { castingsTab: ["castings"], notificationsTab: ["notifications"], profileTab: ["profile"] } }], { relativeTo: this.activeRoute });
        this.page.actionBarHidden = true;
    }

    getIconSource(icon: string): string {
        const iconPrefix = isAndroid ? "res://" : "res://tabIcons/";
        return iconPrefix + icon;
    }
}

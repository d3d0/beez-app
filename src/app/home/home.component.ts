import { Component, ViewContainerRef,OnInit } from "@angular/core";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/directives/dialogs";
import { RouterExtensions } from "nativescript-angular/router";
import { EventData } from "tns-core-modules/data/observable";
import { ActivatedRoute } from "@angular/router";
import { isAndroid } from "tns-core-modules/platform";
import { AppModule } from "../app.module";
import { Page } from "ui/page";
import { BackendService } from "../shared/backend.service";
import { messaging, Message } from "nativescript-plugin-firebase/messaging";
import { PushNotificationsService } from "../shared/pushNotifications.service"
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
        private pushService: PushNotificationsService,
        private page: Page) {}

    ngOnInit(): void {
      console.log(`Notifications esnabled? ${messaging.areNotificationsEnabled()}`);

//       // BackendService.printAll()
        this.routerExtension.navigate([{ outlets: { castingsTab: ["castings"], notificationsTab: ["notifications"], profileTab: ["profile"] } }], { relativeTo: this.activeRoute });
        this.page.actionBarHidden = true;

// messaging.registerForPushNotifications({
//   onPushTokenReceivedCallback: (token: string): void => {
//     console.log("Firebase plugin received a push token: " + token);
//   },

//   onMessageReceivedCallback: (message: Message) => {
//     console.log("Push message received: " + message);
//   },

//   // Whether you want this plugin to automatically display the notifications or just notify the callback. Currently used on iOS only. Default true.
//   showNotifications: true,

//   // Whether you want this plugin to always handle the notifications when the app is in foreground. Currently used on iOS only. Default false.
//   showNotificationsWhenInForeground: true
// }).then(() => console.log("Registered for push"));
    }

    getIconSource(icon: string): string {
        const iconPrefix = isAndroid ? "res://" : "res://tabIcons/";
        return iconPrefix + icon;
    }
}

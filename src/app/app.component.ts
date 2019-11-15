import { Component, OnInit } from "@angular/core";
import { isIOS, isAndroid } from "tns-core-modules/platform";
import { topmost } from "tns-core-modules/ui/frame";
import * as utils from "utils/utils";
import * as platform from "platform";
import * as app from "application";
import { Color } from "color";
import * as colors from "tns-core-modules/color/known-colors";
const firebase = require("nativescript-plugin-firebase");

declare var android;

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

  constructor() {
    if(isIOS) {
      app.on("launch", () => {
        // topmost().ios.controller.navigationBar.barStyle = UIBarStyle.Black;
      });
    }
    if(isAndroid) {
      app.android.on(app.AndroidApplication.activityStartedEvent, function (args) {
          console.log("Event: " + args.eventName + ", Activity: " + args.activity);
          if(isAndroid && platform.device.sdkVersion >= "23") {
            const View = android.view.View;
            const window = app.android.startActivity.getWindow();
            const decorView = app.android.startActivity.getWindow().getDecorView();
            // SYSTEM
            decorView.setSystemUiVisibility(
              // View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY // mostra system bars per poco e poi le nasconde
              View.SYSTEM_UI_FLAG_LAYOUT_STABLE // imposta una vista stabile per il contenuto
              // | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // nascondo la nav bar
              // | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION // mostra la nav bar ma nasconde quella dell'app
              | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN // nascdonde la status bar
              | View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR); // colore font status bar scuro
            // LAYOUT
            let LayoutParams = <any>android.view.WindowManager.LayoutParams;              
            window.addFlags(
              // LayoutParams.FLAG_LAYOUT_IN_SCREEN | // FORSE > posiziona la finestra all'interno dello schermo intero
              // LayoutParams.FLAG_LAYOUT_NO_LIMITS | // FORSE > fullscreen con nav bar e status bar trasparenti
              LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS // permette di ridisegnare la status bar
            );
            window.clearFlags(
              LayoutParams.FLAG_TRANSLUCENT_STATUS // OK! sets View#SYSTEM_UI_FLAG_LAYOUT_STABLE and View#SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
            );
            window.setStatusBarColor(0); // trasparente > OK!
            // window.setNavigationBarColor(0); // trasparente > OK!
            // window.setStatusBarColor(0xff00D796); // VERDE > OK!
            // window.setNavigationBarColor(0xffffd200); // GIALLO > OK! 
          }
          if(isAndroid && platform.device.sdkVersion >= "21" && platform.device.sdkVersion < "23") {
            // hideSystemUI > https://developer.android.com/training/system-ui/immersive#java
            // showSystemUI > https://developer.android.com/training/system-ui/immersive#java
          }
      });
    }
  }

  ngOnInit() {
    // FIREBASE
    firebase.init({}).then(
      () => {
        console.log("firebase.init done");
      },
      error => {
        console.log(`firebase.init error: ${error}`);
      }
    );
  }
}
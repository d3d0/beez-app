import { Component } from '@angular/core';
import { localize } from "nativescript-localize";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  selector: 'ns-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  moduleId: module.id,
})

export class ProfileComponent {
  
  infoTitle=localize("PROFILE.INFO");
  contactsTitle=localize("PROFILE.CONTACTS");
  mediaTitle=localize("PROFILE.MEDIA");
  detailsTitle=localize("PROFILE.DETAILS");
  settingsTitle=localize("PROFILE.SETTINGS");
  profileTitle=localize("PROFILE.PROFILE");
  
 constructor(private routerExtension: RouterExtensions) { 
		console.log('hello from PROFILE component');
	}

  goToSettings(){
    console.log('goToSettings');
    this.routerExtension.navigate(["/home/default/settings"], { clearHistory: true });
  }
	
  hideActivityIndicator() {
    // this.isLoading = true;
    console.log('hideActivityIndicator')
  }

	showActivityIndicator() {
    // this.isLoading = true;
    console.log('showActivityIndicator')
  }
}

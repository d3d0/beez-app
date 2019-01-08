import { Component, OnInit } from '@angular/core';
import { UserService} from "../../user/user.service";
import { Profile} from "../../user/profile.model";

@Component({
  selector: 'ns-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  moduleId: module.id,
})
export class ContactsComponent implements OnInit {
	
	private _profile: Profile;
  constructor(private userService: UserService) {
  	this._profile = this.userService.getProfile();
  }

  ngOnInit() {
  }
    get profile() : Profile{
        return this._profile;
    }
}

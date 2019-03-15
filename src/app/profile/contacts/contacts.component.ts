import { Component, Input } from '@angular/core';
import { UserService} from "../../user/user.service";
import { Profile} from "../../user/profile.model";

@Component({
  selector: 'ns-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  moduleId: module.id,
})
export class ContactsComponent{
	@Input() profile
}

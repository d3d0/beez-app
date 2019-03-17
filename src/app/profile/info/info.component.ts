import { Component, Input } from '@angular/core';
import { ProfileService } from "../profile.service";
import { Profile} from "../../user/profile.model";

@Component({
  selector: 'ns-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  moduleId: module.id,
})
export class InfoComponent  {
  @Input() _profile
  get profile(){
    return this._profile
  }
}

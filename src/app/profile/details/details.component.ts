import { Component, Input } from '@angular/core';
import { ProfileService } from "../profile.service";
import { Profile} from "../../user/profile.model";

@Component({
  selector: 'ns-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  moduleId: module.id,
})

export class DetailsComponent {
  @Input() profile
}

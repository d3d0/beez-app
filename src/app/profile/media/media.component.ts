import { Component, OnInit, Input} from '@angular/core';
import { Profile } from "../../user/profile.model";

@Component({
  selector: 'ns-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
  moduleId: module.id,
})
export class MediaComponent {
  @Input() profile
}

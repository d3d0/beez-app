import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from "../profile.service";
import { Profile} from "../../user/profile.model";

@Component({
  selector: 'ns-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  moduleId: module.id,
})
export class InfoComponent {
  @Input() profile
  @Input() isEditable
  constructor(){
  }

  edit(){
  	if(this.isEditable)
  		console.log('editami')
  }

  textfieldEvent($event, field){
    if(field)
    this.profile[field]=$event.object.text
  }
}

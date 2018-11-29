import { Component } from '@angular/core';
import { localize } from "nativescript-localize";

@Component({
  selector: 'ns-castings',
  templateUrl: './castings.component.html',
  styleUrls: ['./castings.component.css'],
  moduleId: module.id,
})
export class CastingsComponent  {
	ongoingTitle = localize("CASTINGS.ONGOING");
	attendTitle =localize("CASTINGS.ATTEND");
	concludedTitle =localize("CASTINGS.CONCLUDED");
	constructor() { 
		console.log('hello from Castings component');
	}
}

import { Component } from '@angular/core';
import { localize } from "nativescript-localize";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import * as SocialShare from "nativescript-social-share";

import { CastingsService} from "../castings.service";
import { Casting } from "../casting.model";
import { BackendService } from "../../shared/backend.service";
import { alert } from "../../shared";

@Component({
  selector: 'ns-casting',
  templateUrl: './casting-detail.component.html',
  styleUrls: ['./casting-detail.component.css'],
  moduleId: module.id,
})

export class CastingDetailComponent  {
  private _casting:Casting;
  private casting_id;
  private user_id;

  constructor(
    private activeRoute: ActivatedRoute,
    private castingsService: CastingsService,
    private routerExtension: RouterExtensions) {
      this.user_id = BackendService.UID
      this.activeRoute.params.subscribe((params) => {
        this.casting_id=params.id
        this._casting = <Casting>this.castingsService.getCasting(this.casting_id)
      });
    }

  get casting(){
    return this._casting
  }

  candidate(){
    this.castingsService.cadidate(this.user_id,this.casting_id).subscribe( (result)=>{
      console.log(result)
      alert('ok')
    }),
    (error)=> {
      console.log(error.status)
        if (error.status === 400) alert(localize(error.error))
        else alert(localize("ERROR_SERVICE"));
    }
  }

  goBack(): void{
    this.routerExtension.back({ relativeTo: this.activeRoute });
  }
  share(){
    SocialShare.shareText(this._casting.title);
  }
}

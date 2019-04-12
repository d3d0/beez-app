import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef} from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { localize } from "nativescript-localize";
import { ActivatedRoute } from "@angular/router";
import * as SocialShare from "nativescript-social-share";

import { CastingsService} from "../castings.service";
import { Casting } from "../casting.model";
import { BackendService } from "../../shared/backend.service";
import { alert, getIconSource } from "../../shared/utils";

class Agency  {
  vid=""
  name=""
  tid=""
}

@Component({
  selector: 'ns-casting',
  templateUrl: './casting-detail.component.html',
  styleUrls: ['./casting-detail.component.css'],
  moduleId: module.id,
})

export class CastingDetailComponent implements OnInit {

  @ViewChild("CBAgency") AgencyCheckBox: ElementRef;
  public isLoading: boolean = false;
  public noAgency: boolean = false;
  private casting = [];
  private casting_id;
  private user_id;
  getIconSource = getIconSource
  public edit_actions: boolean = false;
  public selectedAgency= new Agency();
  constructor(
    private activeRoute: ActivatedRoute,
    private castingsService: CastingsService,
    private vcRef: ViewContainerRef,
    private routerExtension: RouterExtensions) {
    this.user_id = BackendService.UID
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.casting_id = params.id
      this.castingsService.getCastingById(this.casting_id).subscribe((casting) => {
        this.casting=casting})
    });
  }

  private toggleCheckAgency() {

      console.log(this.selectedAgency)
      this.noAgency = !this.noAgency
      if (this.noAgency) this.selectedAgency= new Agency();
  }

  selectEvent(value, field){
    console.log(value, field)
    if (field) this.selectedAgency = value
  }

private changeAgency(){
  if (this.AgencyCheckBox.nativeElement.checked) {
    this.selectedAgency = new Agency()
  }
}

private candidate(){
  this.isLoading =true
  this.castingsService.cadidate(this.user_id,this.casting_id).subscribe(
    (result)=>{
      this.isLoading =false
      this.castingsService.load().subscribe()
      alert(localize("MESSAGES.CANDIDATE")).then(
        ()=> this.goBack()
        )
    },
    (error)=> {
      this.isLoading =false
      if (error.status === 400) alert(localize(error.error[0]))
        else alert(localize("ERROR_SERVICE")).then(
        ()=> this.goBack()
        )
    })
}

private partecipate(action){
  this.isLoading =true
  this.castingsService.partecipate(this.user_id, this.casting_id, this.selectedAgency.tid, action).subscribe(
    (result)=>{
      this.isLoading =false
      this.castingsService.load().subscribe()
      alert(localize("MESSAGES.CANDIDATE")).then(
        ()=> this.goBack()
        )
    },
    (error)=> {
      this.isLoading =false
      console.log(error)
      if (error.status === 400) alert(localize(error.error[0]))
        else alert(localize("ERROR_SERVICE"));
    })
}

private goBack(): void{
  this.routerExtension.back({ relativeTo: this.activeRoute });
}

private share(){
  let text = localize('MESSAGES.SHARE_WITH_A_FRIEND')
  SocialShare.shareText(text);
}

}

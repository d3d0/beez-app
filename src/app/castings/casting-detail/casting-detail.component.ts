import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef} from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { localize } from "nativescript-localize";
import { ActivatedRoute } from "@angular/router";
import * as SocialShare from "nativescript-social-share";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";

import { SelectModalViewComponent } from "../../shared/select-modal-view/select-modal-view.component";
import { CastingsService} from "../castings.service";
import { TaxonomyService} from "../../shared/taxonomy.service";
import { Casting } from "../casting.model";
import { BackendService } from "../../shared/backend.service";
import { alert } from "../../shared";

class Agency  {
  vid=""
  name="No Agency"
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

  private casting = [];
  private casting_id;
  private user_id;
  public agencies: Agency[]
  public edit_actions: boolean = false;
  public selectedAgency= new Agency();
  constructor(
    private activeRoute: ActivatedRoute,
    private modal: ModalDialogService,
    private taxonomyService: TaxonomyService,
    private castingsService: CastingsService,
    private vcRef: ViewContainerRef,
    private routerExtension: RouterExtensions) {
    this.user_id = BackendService.UID
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.casting_id = params.id
      this.castingsService.getCastingById(this.casting_id).subscribe((casting) => this.casting=casting)
    });
    this.taxonomyService.load().subscribe( ()=>
      this.agencies = this.taxonomyService.getVocabolary('AGENCY')
      )
  }
  
  private labelBannerCard(casting){
    switch (casting) {
      case "action-confirmed":
       return 'CASTINGS.PARTICIPATION_CONFIRMED'
        break;
         case "action-confirmed-archive":
       return 'CASTINGS.PARTICIPATION_CONFIRMED_WHITH_ARCHIVE'
        break;
      case "action-declined":
       return 'CASTINGS.PARTICIPATION_DECLINED'
        break;   
      default:
        return ''
        break;
    }
  }

  private toggleCheck() {
    this.AgencyCheckBox.nativeElement.toggle();
  }

  private changeAgency(){
    if (this.AgencyCheckBox.nativeElement.checked) {
      this.selectedAgency = new Agency()
    }
  }

  private selectAgency(): void {
    if (this.AgencyCheckBox.nativeElement.checked) return
      this.createModelView().then(result => {
        if (result){
          this.selectedAgency = result;
        } 
      }).catch(error => console.log(error));
  }

  private createModelView(): Promise<any> {
    const today = new Date();
    const options: ModalDialogOptions = {
      context: { list: this.agencies , title: "CASTINGS.PARTICIPATION_AGENCY_SELECT_TITLE"},
      fullscreen: true,
      viewContainerRef: this.vcRef
    };
    return this.modal.showModal(SelectModalViewComponent, options);
  }

  private candidate(){
    this.castingsService.cadidate(this.user_id,this.casting_id).subscribe(
      (result)=>{
        alert(localize("MESSAGES.CANDIDATE"))
        this.goBack()
      },
      (error)=> {
        if (error.status === 400) alert(localize(error.error[0]))
          else alert(localize("ERROR_SERVICE"));
      })
  }

  private partecipate(action){
    this.castingsService.partecipate(this.user_id, this.casting_id, this.selectedAgency.tid, action).subscribe(
      (result)=>{
        alert(localize("MESSAGES.CANDIDATE"))
        this.goBack()
      },
      (error)=> {
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

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

  @ViewChild("CBAgency") FirstCheckBox: ElementRef;

  private casting = [];
  private casting_id;
  private user_id;
  public agencies: Agency[]
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

  private toggleCheck() {
    this.FirstCheckBox.nativeElement.toggle();
  }

  private changeAgency(){
    if (this.FirstCheckBox.nativeElement.checked) {
      this.selectedAgency = new Agency()
    }
  }

  private selectAgency(): void {
    if (this.FirstCheckBox.nativeElement.checked) return
      this.createModelView().then(result => {
        this.selectedAgency = result;
        console.log('ritornato', result)
      }).catch(error => console.log(error));
  }

  private createModelView(): Promise<any> {
    const today = new Date();
    const options: ModalDialogOptions = {
      context: { list: this.agencies},
      fullscreen: true,
      viewContainerRef: this.vcRef
    };
    return this.modal.showModal(SelectModalViewComponent, options);
  }

  private candidate(){
    this.castingsService.cadidate(this.user_id,this.casting_id).subscribe(
      (result)=>{
        alert(localize("MESSAGES.CANDIDATE"))
      },
      (error)=> {
        if (error.status === 400) alert(localize(error.error[0]))
          else alert(localize("ERROR_SERVICE"));
      })
  }

  private partecipate(action){
    this.castingsService.partecipate(this.user_id, this.casting_id, this.selectedAgency.tid, action).subscribe(
      (result)=>{
        console.log(result)
        alert(localize("MESSAGES.CANDIDATE"))
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

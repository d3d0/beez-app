import { Component, OnInit, OnDestroy, ViewContainerRef, ViewChild, ElementRef} from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { localize } from "nativescript-localize";
import { ActivatedRoute } from "@angular/router";
import * as SocialShare from "nativescript-social-share";
import { EventData } from "tns-core-modules/data/observable";
import { Subscription } from "rxjs";


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
  styleUrls: ['./casting-detail.component.scss'],
  moduleId: module.id,
})

export class CastingDetailComponent implements OnInit, OnDestroy {

  @ViewChild("CBAgency", {static: false}) AgencyCheckBox: ElementRef;
  public isLoading: boolean = false;
  public noAgency: boolean = false;
  private casting = [];
  private casting_id;
  private user_id;
  
  public getIconSource = getIconSource;
  public edit_actions: boolean = false;
  public selectedAgency = new Agency();
  private agencyName:string;
  private agencyTid:string;

  private _isLoadingService = true;
  private _isLoadedService = false;
  private _dataSubscription: Subscription;

  constructor(
    private activeRoute: ActivatedRoute,
    private castingsService: CastingsService,
    private vcRef: ViewContainerRef,
    private routerExtension: RouterExtensions) {
      this.user_id = BackendService.UID;
  }

  ngOnInit(): void {
    console.log('☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯');
    console.log('l☯☯☯l > CastingDetailComponent > ngOnInit()');
    console.log('☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯');
    console.log('l☯☯☯l > CastingDetailComponent > ngOnInit() > select name',this.selectedAgency.name);
    console.log('l☯☯☯l > CastingDetailComponent > ngOnInit() > select tid',this.selectedAgency.tid);
    this._dataSubscription = this.activeRoute.params.subscribe((params) => {
      this.casting_id = params.id
      this.load();
    });
  }

  load() {
    if (!this._dataSubscription) {

        this.castingsService.getCastingById(this.casting_id).subscribe((casting) => {
          this.casting=casting;
          console.log('☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯');
          // console.log('l☯☯☯l > CastingsService > getCastingById() > casting: ', casting);
          if (casting.agency_talent_casting) {
            console.log('l☯☯☯l > CastingsService > getCastingById() > casting.agency_talent_casting.tid: ', casting.agency_talent_casting.tid);
            console.log('l☯☯☯l > CastingsService > getCastingById() > casting.agency_talent_casting.tid: ', casting.agency_talent_casting.name);
          }
          console.log('☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯');

          this._isLoadingService = false;
          this._isLoadedService = true;

          this.selectedAgency = new Agency();
          // d3d0 fix --> default agency tid and name
          if (casting.agency_talent_casting) {
            this.agencyName = casting.agency_talent_casting.name;
            this.agencyTid = casting.agency_talent_casting.tid;
            this.selectedAgency.name = casting.agency_talent_casting.name;
            this.selectedAgency.tid = casting.agency_talent_casting.tid;
            this.noAgency = false;
          }
          if (casting.agency_talent_casting.tid == '369') {
            this.noAgency = true;
          }
        });
      
    }
  } 

  verificaCasting() {
    if (!this._dataSubscription) {

      this.castingsService.getCastingById(this.casting_id).subscribe((casting) => {
        console.log('☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯',casting.status);

        this._isLoadingService = false;
        this._isLoadedService = true;

        this.selectedAgency = new Agency();
        // d3d0 fix --> default agency tid and name
        if (casting.agency_talent_casting) {
          this.agencyName = casting.agency_talent_casting.name;
          this.agencyTid = casting.agency_talent_casting.tid;
          this.selectedAgency.name = casting.agency_talent_casting.name;
          this.selectedAgency.tid = casting.agency_talent_casting.tid;
          this.noAgency = false;
        }
        if(casting.agency_talent_casting.tid == '369') {
          this.noAgency = true;
        }

        // d3d0 fix --> cambio di stato se visualizzo il casting dalle notifiche
        if(casting.status!='New') {
          this.casting['status']='Audition';
          if(casting.audition_action != '') {
            this.casting['audition_action'] = casting.audition_action;
          }
        }
        if(casting.status!='New' && casting.status!='Audition') {
          this.casting['status']='Close';
        }
      });

    }
  }

  ngOnDestroy() {
    console.log('☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯');
    console.log('CastingDetailComponent ngOnDestroy!');
    console.log('☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯');
    if (this._dataSubscription) {
      this._dataSubscription.unsubscribe();
      this._dataSubscription = null;
    }
  }

  // d3d0 fix --> refresh RadListView component
  onLoadedStack(args: EventData) {
    if (!this._dataSubscription) {
      this.verificaCasting();
    }
    console.log('LOADED ScrollView ############################################');
  }
  onUnloadedStack(args: EventData) {
    this._isLoadingService = true;
    this._isLoadedService = false;

    if (this._dataSubscription) {
      this._dataSubscription.unsubscribe();
      this._dataSubscription = null;
    }
    console.log('UNLOADED ScrollView ############################################');
  }

  /**
   * toggleCheckAgency()
   * checkbox no agenzia, serve per disattivare la select
   */
  private toggleCheckAgency() {
    console.log('l☯☯☯l > CastingDetailComponent > toggleCheckAgency',this.selectedAgency);
    this.noAgency = !this.noAgency;
    if (this.noAgency) {
      this.selectedAgency = new Agency();
    }
    else {
      this.selectedAgency = new Agency();
      this.selectedAgency.name = this.agencyName;
      this.selectedAgency.tid = this.agencyTid;
    }
    console.log('l☯☯☯l > CastingDetailComponent > toggleCheckAgency > select tid',this.selectedAgency.tid);
  }

  /**
   * selectEvent()
   * evento relativo a select agenzia, mi torna l'oggetto selezionato (value)
   * @param value 
   * @param field 
   */
  selectEvent(value, field){
    console.log('l☯☯☯l > CastingDetailComponent > selectEvent > select value',value);
    console.log('l☯☯☯l > CastingDetailComponent > selectEvent > select field',field);
    if (field) {
      // d3d0 --> bug fix tid --> NO!
      // this.selectedAgency.tid = value;
      this.selectedAgency = value;
      this.agencyName = this.selectedAgency.name;
      this.agencyTid = this.selectedAgency.tid;
    }
    console.log('l☯☯☯l > CastingDetailComponent > selectEvent > select tid',this.selectedAgency.tid);
  }

  /**
   * changeAgency() > eliminare?
   */
  private changeAgency(){
    console.log('l☯☯☯l > changeAgency');
    if (this.AgencyCheckBox.nativeElement.checked) {
      this.selectedAgency = new Agency(); 
    }
  }

  /**
   * partecipate()
   * @param action 
   */
  private partecipate(action){
    this.isLoading =true
    this.castingsService.partecipate(this.user_id, this.casting_id, this.selectedAgency.tid, action).subscribe((result)=>{
        console.log('result',result);
        this.isLoading = false;
        this.castingsService.load().subscribe();
        alert(localize("MESSAGES.CANDIDATE")).then(()=> this.goBack());
      },
      (error)=> {
        this.isLoading =false;
        console.log(error);
        if (error.status === 400) alert(localize(error.error[0]))
        else alert(localize("ERROR_SERVICE"));
      });
  }
  
  /**
   * candidate()
   */
  private candidate(){
    this.isLoading =true
    this.castingsService.cadidate(this.user_id, this.casting_id).subscribe((result)=>{
        console.log('result',result);
        this.isLoading = false;
        this.castingsService.load().subscribe();
        alert(localize("MESSAGES.CANDIDATE")).then(()=> this.goBack());
      },
      (error)=> {
        this.isLoading =false;
        console.log(error);
        if (error.status === 400) alert(localize(error.error[0]))
        else alert(localize("ERROR_SERVICE")).then(()=> this.goBack())
      });
  }

  /**
   * goBack()
   */
  private goBack(): void{
    this.routerExtension.back({ relativeTo: this.activeRoute });
  }

  /**
   * share()
   */
  private share(){
    let text = localize('MESSAGES.SHARE_WITH_A_FRIEND')
    SocialShare.shareText(text);
  }

}

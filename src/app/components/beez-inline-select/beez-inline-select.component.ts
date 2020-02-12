import { Component, Input, Output, ViewContainerRef, EventEmitter } from "@angular/core";
import { formatDate } from '@angular/common';
import { Observable, from, BehaviorSubject, throwError } from "rxjs";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { localize } from "nativescript-localize";
import { SelectDateModalViewComponent } from "../select-date-modal-view/select-date-modal-view.component";
import { SelectModalViewComponent } from "../select-modal-view/select-modal-view.component";
import { TaxonomyService} from "../../shared/taxonomy.service";
import localeIt from '@angular/common/locales/it';
import { registerLocaleData } from '@angular/common';
import { device } from "tns-core-modules/platform";


class Term {
    vid:string;
    tid:string;
    name:string;
}

@Component({
    selector: "BeezInlineSelect",
    moduleId: module.id,
    styleUrls: ['./beez-inline-select.component.scss'],
    template: `
    <StackLayout orientation="horizontal" (tap)="openModal()" backgroundColor="">
        <Label class="label-textfield" [text]="placeholder"></Label>
        <Label id="text" class="title" *ngIf="obj" [text]="obj.name | titlecase"></Label>
    </StackLayout>
    `
})

export class BeezInlineSelect {
    @Input() placeholder: string;
    @Input() isSelect: string;
    @Input() type: string;
    @Input() last: boolean;
    @Input() editable: boolean;
    @Output() selectEvent = new EventEmitter<string>();
    private obj = new Term;
    private lingua: string;
    //private text: any;

    constructor(
        private vcRef: ViewContainerRef,
        private taxonomyService: TaxonomyService,
        private modal: ModalDialogService) {
            registerLocaleData(localeIt, 'it-IT');
            this.lingua = device.language.substring(0,2).toLowerCase();
            console.log('l☯☯☯l > lingua > ',this.lingua);
        }

    @Input() set value (value:any){
        if( value )
        //this.text = value;
        //console.log('--------------////////FRA//////////----------->', this.text);
        if (this.type == "datapicker"){
            console.log('IS DATEPICKER ?',this.type);
            console.log('IS DATEPICKER VALUE >',value);

            // if(valoreData > 0) { // se arriva in TIMESTAMP trasformo in ISO
            //     this.obj.name = formatDate(parseInt(value) * 1000 ,'dd MMMM yy','en'); // FIX!
            // }
            // else { // se arriva in DATEPICKER trasformo in TIMESTAMP
            //     this.obj.name = formatDate(value ,'dd MMMM yy','en'); // FIX!
            // }
            
            // DOCS: testo visualizzato nel campo di testo !!
            if( this.lingua == 'it') {
                this.obj.name = formatDate(value ,'dd MMMM yyyy','it-IT'); // FIX!
            } 
            else {
                this.obj.name = formatDate(value ,'MMMM dd yyyy','en-EN'); // FIX!
            }
            console.log('IS DATEPICKER this.obj.name >',this.obj.name);
        } 
        else {
            console.log('IS DATEPICKER ?',this.type);
            this.taxonomyService.getTerm(value).subscribe( obj => this.obj = obj[0] );
        }
    }
    
    private openModal(){
        // d3d0 --> bug fix select
        console.log('editable -->', this.editable);
        if (!this.editable) return; // se false > return, se true > procede

        if (this.type == "datapicker"){
            this.createDatapickerModelView().then((value)=> {
                if(value){
                    console.log('l☯☯☯l > BeezInlineSelect > openModal() > datapicker value:',value);

                    // DOCS: testo visualizzato nella select !!
                    if( this.lingua == 'it') {
                        this.obj.name = formatDate(value ,'dd MMMM yyyy','it-IT'); // FIX!
                    } 
                    else {
                        this.obj.name = formatDate(value ,'MMMM dd yyyy','en-EN'); // FIX!
                    }
                    this.selectEvent.emit(value); // DOCS: valore passato a this.profile[field] !!
                }
            }).catch(error => console.log(error.message));
        }
        else {

            console.log('passo di qui');
            this.createTaxonomyModelView().then((value)=> {
                console.log('passo di qui----------->',value);
                if(value){
                    console.log('l☯☯☯l > BeezInlineSelect > openModal() > taxonomy value:',value);
                    this.obj=value;
                    this.selectEvent.emit(value);
                }
            }).catch(error => console.log(error.message));
        }
    }

    // datepicker
    private createDatapickerModelView(): Promise<any> {
        
        // DOCS: orario corrente
        const date = new Date();
        console.log(">>> normal date " + date);
        //console.log(">>> normal date " + this.text);

        // DOCS: aggiungere un'ora all'orario corrente
        // const now = new Date();
        // const nowDate = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
        // console.log(">>> modified nowDate " + nowDate);

        const options: ModalDialogOptions = {
            context: { 
                title: this.placeholder,
                currentdate: date,
                isSelect: this.isSelect,
                selectedDate:this.obj.name
            },
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        return this.modal.showModal(SelectDateModalViewComponent, options);
    }

    // taxonomy
    private createTaxonomyModelView(): Promise<any> {
        const options: ModalDialogOptions = {
            context: {
                vocabolary: this.type,
                title: this.placeholder,
                tid: this.obj.tid,
                isSelect: this.isSelect},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        return this.modal.showModal(SelectModalViewComponent, options);
    }

}

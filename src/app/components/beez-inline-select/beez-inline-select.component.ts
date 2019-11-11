import { Component, Input, Output, ViewContainerRef, EventEmitter } from "@angular/core";
import { formatDate } from '@angular/common';
import { Observable, from, BehaviorSubject, throwError } from "rxjs";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { localize } from "nativescript-localize";
import { SelectDateModalViewComponent } from "../select-date-modal-view/select-date-modal-view.component";
import { SelectModalViewComponent } from "../select-modal-view/select-modal-view.component";
import { TaxonomyService} from "../../shared/taxonomy.service";

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
    private text: string;

    constructor(
        private vcRef: ViewContainerRef,
        private taxonomyService: TaxonomyService,
        private modal: ModalDialogService) {}

    @Input() set value (value:string){
        if( value )
            if (this.type == "datapicker"){
                console.log('IS DATEPICKER ?',this.type);
                console.log('IS DATEPICKER VALUE >',value);
                // let valoreData = (new Date(value)).getTime();
                // if(valoreData > 0) { // se arriva in TIMESTAMP trasformo in ISO
                //     this.obj.name = formatDate(parseInt(value) * 1000 ,'dd MMMM yy','en'); // FIX!
                // }
                // else { // se arriva in DATEPICKER trasformo in TIMESTAMP
                //     this.obj.name = formatDate(value ,'dd MMMM yy','en'); // FIX!
                // }
                this.obj.name = formatDate(value ,'dd MMMM yy','en'); // FIX!
                console.log('IS DATEPICKER this.obj.name >',this.obj.name);
            } 
            else {
                console.log('IS DATEPICKER ?',this.type);
                this.taxonomyService.getTerm(value).subscribe( obj => this.obj = obj[0] );
            }
    }

    // isIsoDate(str) {
    //     if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
    //     var d = new Date(str); 
    //     return d.toISOString()===str;
    // }
    
    private openModal(){
        // d3d0 --> bug fix select
        console.log('editable -->', this.editable);
        if (!this.editable) return; // se false > return, se true > procede

        if (this.type == "datapicker"){
            this.createDatapickerModelView().then((value)=> {
                if(value){
                    console.log('123123123123123123123123 > l☯☯☯l > value:',value);
                    this.obj.name = formatDate(value ,'dd MMMM yy','en'); // testo visualizzato nella label del componente
                    this.selectEvent.emit(value); // valore passato a this.profile[field]
                }
            }).catch(error => console.log(error.message));
        }
        else {
            this.createTaxonomyModelView().then((value)=> {
                if(value){
                    console.log('123123123123123123123123 > l☯☯☯l > value:',value);
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

        // DOCS: aggiungere un'ora all'orario corrente
        const now = new Date();
        const nowDate = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
        console.log(">>> modified nowDate " + nowDate);

        const options: ModalDialogOptions = {
            context: { title: this.placeholder, currentdate: date, isSelect: this.isSelect },
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        return this.modal.showModal(SelectDateModalViewComponent, options);
    }

    // taxonomy
    private createTaxonomyModelView(): Promise<any> {
        const options: ModalDialogOptions = {
            context: { vocabolary: this.type , title: this.placeholder, tid: this.obj.tid, isSelect: this.isSelect},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        return this.modal.showModal(SelectModalViewComponent, options);
    }

}

import { Component, Input, OnInit, Output, ViewContainerRef, EventEmitter } from "@angular/core";
import { formatDate } from '@angular/common';
import { Observable, from, BehaviorSubject, throwError } from "rxjs";

import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { localize } from "nativescript-localize";
import { SelectDateModalViewComponent } from "../select-date-modal-view/select-date-modal-view.component";
import { SelectModalViewComponent } from "../select-modal-view/select-modal-view.component";
import { TaxonomyService} from "../../shared/taxonomy.service";
interface Term {
    vid:string;
    tid:string;
    name:string;
}
@Component({
    selector: "BeezInlineSelect",
    moduleId: module.id,
    styleUrls: ['./beez-inline-select.component.css'],
    template: `
    <StackLayout orientation="horizontal" (tap)="openModal()">
        <Label [text]="placeholder"></Label>
        <Label id="text" *ngIf="obj" [text]="obj.name" class="title"></Label>
    </StackLayout>
    `
})

export class BeezInlineSelect implements OnInit {
    @Input() placeholder: string;
    @Input() type: string;
    @Output() selectEvent = new EventEmitter<string>()
    private obj = null;

    constructor(
        private vcRef: ViewContainerRef,
        private taxonomyService: TaxonomyService,
        private modal: ModalDialogService) {}

    @Input() 
    set value (value:string){
            if( value )
            if (this.type == "datapicker"){
                // this.obj.name = formatDate(Date() ,'dd MMMM yy',localize('LANG'))
            } else{ 
                console.log(value)
                this.taxonomyService.getTerm(value).subscribe( obj => this.obj = obj[0] )
            }
        }
        
        ngOnInit(){ }

        private openModal(){
            if (this.type == "datapicker"){
                this.createDatapickerModelView().then((value)=> {
                    if(value){
                        this.obj.name = formatDate(value ,'dd MMMM yy',localize('LANG'))
                        this.selectEvent.emit(value)
                    }
                })
            }
            else {
                this.createTaxonomyModelView().then((value)=> {
                    if(value){
                        this.obj=value
                        this.selectEvent.emit(value)
                    }
                })
            }
        }

        private createDatapickerModelView(): Promise<any> {
            const date = new Date();
            const options: ModalDialogOptions = {
                context: { title: this.placeholder, currentdate: date },
                fullscreen: true,
                viewContainerRef: this.vcRef
            };
            return this.modal.showModal(SelectDateModalViewComponent, options);
        }

        private createTaxonomyModelView(): Promise<any> {
            const options: ModalDialogOptions = {
                context: { vocabolary: this.type , title: this.placeholder, tid: this.value},
                fullscreen: true,
                viewContainerRef: this.vcRef
            };
            return this.modal.showModal(SelectModalViewComponent, options);
        }

    }

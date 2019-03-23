import { Component, Input, Output, ViewContainerRef, EventEmitter } from "@angular/core";
import { formatDate } from '@angular/common';
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { localize } from "nativescript-localize";

import { SelectDateModalViewComponent } from "./select-date-modal-view/select-date-modal-view.component";
import { SelectModalViewComponent } from "./select-modal-view/select-modal-view.component";
import { TaxonomyService} from "../taxonomy.service";

@Component({
    selector: "BeezFloatLabelSelect",
    moduleId: module.id,
    styleUrls: ['./beez-float-label-select.component.css'],
    template: `
        <GridLayout rows="10, auto" (tap)="openModal()">
        <Label [visibility]="!!value?'visible':'hidden'" id="label" row="1" [text]="placeholder|uppercase" class="label"></Label>
        <Label [visibility]="!!value?'visible':'hidden'" id="text" row="1" [text]="value"></Label>
        <Label [visibility]="!value?'visible':'hidden'" id="placeholder" row="1" [text]="placeholder"></Label>
        </GridLayout>
    `
})

export class BeezFloatLabelSelect {
    @Input() placeholder: string;
    @Input() type: string;
    @Output() selectEvent = new EventEmitter<string>()
    private value ='';
    private list;
    
    constructor(
        private vcRef: ViewContainerRef,
        private taxonomyService: TaxonomyService,
        private modal: ModalDialogService) {
        if (this.type != "datapicker")
            this.taxonomyService.load().subscribe( ()=>{
                this.list = this.taxonomyService.getVocabolary(this.type)
            })
    }

    private openModal(){
        if (this.type == "datapicker"){
            this.createDatapickerModelView().then((value)=> {
                this.selectEvent.emit(value)
                this.value=formatDate(value,'dd MMMM yy',localize('LANG'))})
        }
        else {
            this.createTaxonomyModelView().then((value)=> {
                this.selectEvent.emit(value.tid)
                this.value=value.name})
        }
    }

    private createDatapickerModelView(): Promise<any> {
        const today =  new Date();
        const options: ModalDialogOptions = {
            context: { title: this.placeholder, currentdate: today },
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        return this.modal.showModal(SelectDateModalViewComponent, options);
    }

    private createTaxonomyModelView(): Promise<any> {
        const options: ModalDialogOptions = {
            context: { list: this.list , title: this.placeholder},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        return this.modal.showModal(SelectModalViewComponent, options);
    }

}

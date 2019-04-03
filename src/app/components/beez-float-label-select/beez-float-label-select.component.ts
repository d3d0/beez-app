import { Component, Input, OnInit, Output, ViewContainerRef, EventEmitter } from "@angular/core";
import { formatDate } from '@angular/common';
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { localize } from "nativescript-localize";
import { SelectDateModalViewComponent } from "../select-date-modal-view/select-date-modal-view.component";
import { SelectModalViewComponent } from "../select-modal-view/select-modal-view.component";

@Component({
    selector: "BeezFloatLabelSelect",
    moduleId: module.id,
    styleUrls: ['./beez-float-label-select.component.css'],
    template: `
    <GridLayout rows="10, 32" (tap)="openModal()">
    <Label [visibility]="!value?'visible':'hidden'" id="label" row="1" [text]="placeholder|uppercase" class="label"></Label>
    <Label [visibility]="!value?'visible':'hidden'" id="text" row="1" class="title" [text]="text" class="title" ios:paddingBottom="8" ></Label>
    <Label [visibility]="!!value?'visible':'hidden'" id="placeholder" row="1" [text]="placeholder" class="title" ios:paddingBottom="8" ></Label>
    </GridLayout>
    `
})

export class BeezFloatLabelSelect implements OnInit {
    @Input() placeholder: string;
    @Input() type: string;
    @Output() selectEvent = new EventEmitter<string>()
    private text: string;
    private list;

    constructor(
        private vcRef: ViewContainerRef,
        private modal: ModalDialogService) {}

    @Input() 
    set value (value:string){
        // if(value){
                // if (this.type == "datapicker")
                //     this.text = formatDate(this.value,'dd MMMM yy',localize('LANG'))
                // else
                 this.text = value 
                 console.log('value', value)

             // }
    }
  
    ngOnInit(){
        // console.log('value ' , this.value)
        // if (this.type == "datapicker")
        //     this.text = formatDate(this.value,'dd MMMM yy',localize('LANG'))
        // else
        //  this.text = this.value 

 }

 private openModal(){
    if (this.type == "datapicker"){
        this.createDatapickerModelView().then((value)=> {
            if(value){
                this.text=formatDate(value,'dd MMMM yy',localize('LANG'))
                this.selectEvent.emit(value)
            }
        })
    }
    else {
        this.createTaxonomyModelView().then((value)=> {
            if(value){
                this.text=value.name
                this.selectEvent.emit(value.tid)
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

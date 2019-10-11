import { Component, Input, OnInit, Output, ViewContainerRef, EventEmitter } from "@angular/core";
import { formatDate } from '@angular/common';
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { localize } from "nativescript-localize";
import { SelectDateModalViewComponent } from "../select-date-modal-view/select-date-modal-view.component";
import { SelectModalViewComponent } from "../select-modal-view/select-modal-view.component";

@Component({
    selector: "BeezFloatLabelSelect",
    moduleId: module.id,
    styleUrls: ['./beez-float-label-select.component.scss'],
    template: `
    <GridLayout rows="10, 32" (tap)="openModal()" backgroundColor="">
        <Label [visibility]="text?'visible':'hidden'" id="label" row="1" [text]="placeholder|uppercase" class="label" [class.dark]="dark"></Label>
        <Label [visibility]="!text?'visible':'hidden'" id="placeholder" row="1" [text]="placeholder" class="title"  [class.dark]="dark" ios:paddingBottom="8" ></Label>
        <Label [visibility]="text?'visible':'hidden'" id="text" row="1" class="title" [text]="text" class="title"  [class.dark]="dark" ios:paddingBottom="8" ></Label>
    </GridLayout>
    `
})

export class BeezFloatLabelSelect implements OnInit {
    @Input() placeholder: string;
    @Input() type: string;
    @Input() dark: boolean;
    @Input() tid: string;
    @Output() selectEvent = new EventEmitter<string>();
    @Input() editable: boolean;
    private list;
    private text: string;
    // private tid: string;
    // private isEditable;
    @Input() set value (value:string){ this.text = value; }
    // @Input() set tid (value:string){ this.tid = value; }
    // @Input() set editable (value: boolean){ this.isEditable=value; }

    constructor(
        private vcRef: ViewContainerRef,
        private modal: ModalDialogService) {}

    ngOnInit(){
        // this.text = 'prova';
        
        // console.log('value ' , this.value_name);
        // console.log('value ' , this.value_tid);
        // if (this.type == "datapicker")
        //      this.text = formatDate(this.value,'dd MMMM yy','en')
        // else
        //      this.text = this.value 
    }

    private openModal(){
        // if(!this.isEditable) return;

        // d3d0 --> bug fix select
        console.log('****** > l☯☯☯l > BeezFloatLabelSelect > openModal() > editable', this.editable);
        if (!this.editable) return;

        if (this.type == "datapicker"){
            this.createDatapickerModelView().then((value)=> {
                if(value){
                    this.text=formatDate(value,'dd MMMM yy','en')
                    this.selectEvent.emit(value);
                }
            })
        }
        else {
            this.createTaxonomyModelView().then((value)=> {
                if(value){
                    this.text=value.name;
                    this.tid=value.tid;
                    // d3d0 --> bug fix tid --> NO!
                    // this.selectEvent.emit(value.tid);
                    this.selectEvent.emit(value);
                }
            })
        }
        console.log('****** > l☯☯☯l > BeezFloatLabelSelect > openModal() > text', this.text);
        console.log('****** > l☯☯☯l > BeezFloatLabelSelect > openModal() > tid', this.tid);
    }

    // datepicker
    private createDatapickerModelView(): Promise<any> {
        const date = new Date();
        const options: ModalDialogOptions = {
            context: { title: this.placeholder, currentdate: date },
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        return this.modal.showModal(SelectDateModalViewComponent, options);
    }

    // taxonomy
    private createTaxonomyModelView(): Promise<any> {
        const options: ModalDialogOptions = {
            context: { vocabolary: this.type , title: this.placeholder, tid: this.tid},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        return this.modal.showModal(SelectModalViewComponent, options);
    }

}

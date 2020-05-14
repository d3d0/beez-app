import { Component, Input, OnInit, Output, ViewContainerRef, EventEmitter } from "@angular/core";
import { formatDate } from '@angular/common';
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { localize } from "nativescript-localize";
import { SelectDateModalViewComponent } from "../select-date-modal-view/select-date-modal-view.component";
import { SelectModalViewComponent } from "../select-modal-view/select-modal-view.component";
import { device } from "tns-core-modules/platform";
import localeIt from '@angular/common/locales/it';
import { registerLocaleData } from '@angular/common';


@Component({
    selector: "BeezFloatLabelSelect",
    moduleId: module.id,
    styleUrls: ['./beez-float-label-select.component.scss'],
    template: `
    <GridLayout rows="15, 32" (tap)="openModal()" backgroundColor="">
        <Label [visibility]="text?'visible':'hidden'" id="label" row="1" [text]="placeholder|uppercase" class="label" ios:paddingBottom="25" android:paddingBottom="15" [class.dark]="dark"></Label>
        <Label [visibility]="!text?'visible':'hidden'" id="placeholder" row="1" [text]="placeholder" class="title"  [class.dark]="dark" ios:paddingBottom="8"  android:paddingBottom="4"></Label>
        <Label [visibility]="text?'visible':'hidden'" id="text" row="1" class="title" [text]="text" class="title"  [class.dark]="dark" ios:paddingBottom="8" android:paddingBottom="4"></Label>
    </GridLayout>
    `
})

export class BeezFloatLabelSelect implements OnInit {
    @Input() placeholder: string;
    @Input() isSelect: string;
    @Input() isMajor: string;
    @Input() isExpiry: string;
    @Input() type: string;
    @Input() dark: boolean;
    @Input() tid: string; // casting-detail.component.html
    @Input() editable: boolean;
    @Output() selectEvent = new EventEmitter<string>();
    private list;
    private lingua: string;
    private text: any;
    private data: any;

    constructor(
        private vcRef: ViewContainerRef,
        private modal: ModalDialogService) {
            registerLocaleData(localeIt, 'it-IT');
            this.lingua = device.language.substring(0,2).toLowerCase();
            console.log('l☯☯☯l > lingua > ',this.lingua);
    }

    ngOnInit(){
    }

    @Input() set value (value: any){ 
        this.text = value;
        console.log('l☯☯☯l > BeezFloatLabelSelect > @Input() set value',value);
    }

    private openModal(){
        // if(!this.isEditable) return;

        // d3d0 --> bug fix select
        console.log('l☯☯☯l > BeezFloatLabelSelect > openModal() > editable', this.editable);
        if (!this.editable) return;

        if (this.type == "datapicker"){ // DATA
            this.createDatapickerModelView().then((value)=> {
                if(value){
                    if( this.lingua == 'it') {
                        this.text = formatDate(value ,'dd MMMM yyyy','it-IT'); // FIX!
                    } 
                    else {
                        this.text = formatDate(value ,'MMMM dd yyyy','en-EN'); // FIX!
                    }
                    this.data=formatDate(value,'dd MMMM yy','en');
                    this.selectEvent.emit(value);
                }
            })
        }
        else { // TAXONOMY
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
        console.log('l☯☯☯l > BeezFloatLabelSelect > openModal() > text', this.text);
        console.log('l☯☯☯l > BeezFloatLabelSelect > openModal() > tid', this.tid);
    }

    // datepicker
    private createDatapickerModelView(): Promise<any> {
        const date = new Date();
        console.log('--------------////////FRA//////////----------->', this.data);
        console.log('--------------////////FRA//////////----------->', this.data);
        console.log('--------------////////FRA//////////----------->', this.data);

        const options: ModalDialogOptions = {
            context: { 
                title: this.placeholder,
                currentdate: date,
                isSelect: this.isSelect,
                isMajor: this.isMajor,
                isExpiry: this.isExpiry,
                selectedDate:this.data
            },
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        return this.modal.showModal(SelectDateModalViewComponent, options);
    }

    // taxonomy
    private createTaxonomyModelView(): Promise<any> {
        console.log('--------------////////d3d0//////////----------->', this.data);
        console.log('--------------////////d3d0//////////----------->', this.data);
        console.log('--------------////////d3d0//////////----------->', this.data);
        const options: ModalDialogOptions = {
            context: { vocabolary: this.type , title: this.placeholder, tid: this.tid, isSelect: this.isSelect},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        return this.modal.showModal(SelectModalViewComponent, options);
    }

}

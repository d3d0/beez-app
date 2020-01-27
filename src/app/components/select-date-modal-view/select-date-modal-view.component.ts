import { Component, ViewChild, ElementRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { DatePicker } from "tns-core-modules/ui/date-picker";
import { formatDate } from '@angular/common';

@Component({
    selector: 'ns-select-date-modal',
    templateUrl: './select-date-modal-view.component.html',
    styleUrls: ['./select-date-modal-view.component.scss'],
    moduleId: module.id,
})

export class SelectDateModalViewComponent {
    

    @ViewChild("datepicker", {static: false}) datePickerElement: ElementRef;
    private picked:string;
    private currentdate: Date;
    private maxDate: Date;
    private minDate: Date;
    private title;
    private isSelect = false;
    private isMajor = false;
    private yearDate:Number;
    private dayDate:Number;
    private monthDate:Number;
    private selectedDate:any;
    private displayDate:any;
    private dateY:Number;
    private dateM:Number;
    private dateD:Number;

    constructor( private router: RouterExtensions, private params: ModalDialogParams ) {
        this.currentdate = params.context.currentdate;
        if(params.context.selectedDate){
            this.selectedDate = params.context.selectedDate;
           
        }
        
        console.log('l☯☯☯l > SelectModalViewComponent > constructor() > currentdate',this.currentdate);
        console.log('l☯☯☯l > SelectModalViewComponent > constructor() > currentdate year',this.yearDate);
        console.log('l☯☯☯l > SelectModalViewComponent > constructor() > currentdate month',this.monthDate);
        console.log('l☯☯☯l > SelectModalViewComponent > constructor() > currentdate day',this.dayDate);


        this.title = params.context.title;
        if(params.context.isSelect) this.isSelect = params.context.isSelect;
        if(params.context.isMajor) this.isMajor = params.context.isMajor;
        console.log('l☯☯☯l > SelectModalViewComponent > constructor() > params',this.params);
        // console.log('l☯☯☯l > SelectModalViewComponent > constructor() > isSelect',this.isSelect);
        console.log('l☯☯☯l > SelectModalViewComponent > constructor() > isMajor',this.isMajor);
        this.getMaxDate();
    }

    getMaxDate() :void {
        if(this.selectedDate){
            this.displayDate = this.selectedDate
        }else{
            const now_old = new Date();
            now_old.setFullYear(now_old.getFullYear() - 28);
            this.displayDate = now_old;
        }

        console.log(this.displayDate);
        const now = new Date();
        now.setFullYear(now.getFullYear() - 18);
        this.maxDate = now;
    }


    onBack(): void {
        console.log("onback")
        this.params.closeCallback();
    }

    public onClose() {
        let datePicker: DatePicker = <DatePicker>this.datePickerElement.nativeElement;
        this.params.closeCallback(datePicker.date);
    }
 }
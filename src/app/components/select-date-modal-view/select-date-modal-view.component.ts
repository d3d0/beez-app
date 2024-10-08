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
    private isMajor = 'true';
    private isExpiry = 'false';
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
        
        console.log('l☯☯☯l > SelectModalViewComponent > constructor() > selectedDate',this.selectedDate);
        console.log('l☯☯☯l > SelectModalViewComponent > constructor() > currentdate',this.currentdate);
        console.log('l☯☯☯l > SelectModalViewComponent > constructor() > currentdate year',this.yearDate);
        console.log('l☯☯☯l > SelectModalViewComponent > constructor() > currentdate month',this.monthDate);
        console.log('l☯☯☯l > SelectModalViewComponent > constructor() > currentdate day',this.dayDate);


        this.title = params.context.title;
        if(params.context.isSelect) this.isSelect = params.context.isSelect;
        if(params.context.isMajor) this.isMajor = params.context.isMajor;
        if(params.context.isExpiry) this.isExpiry = params.context.isExpiry;
        
        console.log('l☯☯☯l > SelectModalViewComponent > constructor() > params',this.params);
        console.log('l☯☯☯l > SelectModalViewComponent > constructor() > isSelect',this.isSelect);
        console.log('l☯☯☯l > SelectModalViewComponent > constructor() > isMajor',this.isMajor);
        console.log('l☯☯☯l > SelectModalViewComponent > constructor() > isExpiry',this.isExpiry);
        this.getMaxDate();
    }

    getMaxDate() :void {

        if (this.selectedDate) {
            this.displayDate = this.selectedDate;
        }
        else {
            const now_old = new Date();
            now_old.setFullYear(now_old.getFullYear() - 30);
            this.displayDate = now_old;
        }
        console.log('l☯☯☯l > displayDate', this.displayDate);

        if (this.isMajor == 'true') { 
            /**
             * è MAGGIORENNE > max data impostata a -18 anni
             */
            console.log('l☯☯☯l > MAGGIORENNE!');
            const now = new Date();
            now.setFullYear(now.getFullYear() - 18);
            this.maxDate = now;
        } 
        else {
            console.log('l☯☯☯l > SelectModalViewComponent > constructor() > isExpiry',this.isExpiry);

            if (this.isExpiry == 'true') { 
                /**
                 * è DATA DI SCADENZA > max data impostata a +10 anni
                 */
                console.log('l☯☯☯l > DATA di SCADENZA!');
                const now = new Date();
                now.setFullYear(now.getFullYear() + 20);
                this.maxDate = now;
            } 
            if (this.isExpiry == 'false') { 
                /**
                 * è MINORENNE > max data impostata a oggi
                 */
                console.log('l☯☯☯l > MINORENNE!');
                const now = new Date();
                now.setFullYear(now.getFullYear() - 0);
                this.maxDate = now;
            }

        }
        console.log('l☯☯☯l > maxDate', this.maxDate);
        
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
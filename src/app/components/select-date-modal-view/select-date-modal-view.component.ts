import { Component, ViewChild, ElementRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { DatePicker } from "tns-core-modules/ui/date-picker";

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
    private title;
    private isSelect = false;
    private isMajor = false;

    constructor( private router: RouterExtensions, private params: ModalDialogParams ) {
        this.currentdate = params.context.currentdate;
        this.title = params.context.title;
        if(params.context.isSelect) this.isSelect = params.context.isSelect;
        if(params.context.isMajor) this.isMajor = params.context.isMajor;
        console.log('l☯☯☯l > SelectModalViewComponent > constructor() > params',this.params);
        // console.log('l☯☯☯l > SelectModalViewComponent > constructor() > isSelect',this.isSelect);
        console.log('l☯☯☯l > SelectModalViewComponent > constructor() > isMajor',this.isMajor);
        this.getMaxDate();
    }

    getMaxDate() :void {
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
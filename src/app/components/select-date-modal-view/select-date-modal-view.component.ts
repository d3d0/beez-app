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
    private picked:string
    private currentdate: Date;
    private title

    constructor( private router: RouterExtensions, private params: ModalDialogParams ) {
        this.currentdate = params.context.currentdate;
        this.title = params.context.title;
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
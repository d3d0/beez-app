import { Component, ViewChild, ElementRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { DatePicker } from "tns-core-modules/ui/date-picker";

@Component({
    selector: 'ns-select-date-modal',
    templateUrl: './select-date-modal-view.component.html',
    styleUrls: ['./select-date-modal-view.component.css'],
    moduleId: module.id,
})

export class SelectDateModalViewComponent {
    @ViewChild("datepicker") datePickerElement: ElementRef;
    private picked:string
    private currentdate: Date;
    private title

    constructor( private router: RouterExtensions, private params: ModalDialogParams ) {
        this.currentdate = new Date(params.context.currentdate);
        this.title = params.context.title;
    }

    back(): void {
        this.params.closeCallback(new Date(this.currentdate))
    }

    public onClose() {
        let datePicker: DatePicker = <DatePicker>this.datePickerElement.nativeElement;
        this.params.closeCallback(datePicker.date);
    }
 }
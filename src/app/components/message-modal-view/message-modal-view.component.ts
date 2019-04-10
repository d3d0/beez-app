import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { Observable } from "rxjs";
import { Page, ShownModallyData } from "tns-core-modules/ui/page";

import { Blur } from 'nativescript-blur';
import * as app from "tns-core-modules/application";
let blur = new Blur(); // pass true to enable limited usage on android (for now);

@Component({
    selector: 'ns-message-modal',
    templateUrl: './message-modal-view.component.html',
    styleUrls: ['./message-modal-view.component.css'],
    moduleId: module.id
})

export class MessageModalViewComponent implements OnInit{
    private message
    public buttonText
    private title
    private footer
    @ViewChild("background") background: ElementRef;

    constructor(private _params: ModalDialogParams, page:Page) {
        this.message = _params.context.message;
        this.title = _params.context.title;
        this.footer = _params.context.footer;
        this.buttonText = _params.context.buttonText;



    }

ngOnInit(){
        blur.on(this.background.nativeElement, "dimmer", 10, "light", 2)
}
    onClose() {
        this._params.closeCallback();
    }

    onBack(): void {
        console.log("onback")
        this._params.closeCallback();
    }
}
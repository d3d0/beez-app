import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { Observable } from "rxjs";
import { Page, ShownModallyData } from "tns-core-modules/ui/page";
import { isIOS } from "tns-core-modules/platform";
// import { Blur } from 'nativescript-blur';
// import * as app from "tns-core-modules/application";

@Component({
    selector: 'ns-message-modal',
    templateUrl: './message-modal-view.component.html',
    styleUrls: ['./message-modal-view.component.scss'],
    moduleId: module.id
})

export class MessageModalViewComponent implements OnInit{
    private message
    private title
    private footer
    public buttonText

    @ViewChild("background", {static: false}) background: ElementRef;

    constructor(private _params: ModalDialogParams, page:Page) {
        this.message = _params.context.message;
        this.title = _params.context.title;
        this.footer = _params.context.footer;
        this.buttonText = _params.context.buttonText;
        
    }

    ngOnInit(){
        // d3d0 fix --> su android non funziona!
        if (isIOS) {
            // let blur = new Blur(); // pass true to enable limited usage on android (for now);
            // blur.on(this.background.nativeElement, "dimmer", 10, "light", 2)
        }
    }

    onClose() {
        this._params.closeCallback();
    }

    onBack(): void {
        console.log("onback")
        this._params.closeCallback();
    }
}
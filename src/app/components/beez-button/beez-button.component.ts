import { Component, Input, Output, EventEmitter,ViewChild, ElementRef, OnChanges  } from "@angular/core";
import { Color } from "tns-core-modules/color";
import { Page } from "tns-core-modules/ui/page";
import { isIOS } from "tns-core-modules/platform";
import * as utils from "tns-core-modules/utils/utils";
import { TextField } from "tns-core-modules/ui/text-field";

@Component({
    selector: "BeezButton",
    moduleId: module.id,
    styleUrls: ['./beez-button.component.scss'],
    template: `
    <StackLayout class="container" [row]="row" [col]="col" android:marginBottom="13">
        <CardView width="100%" elevation="2" radius="15" shadowOpacity="0.2" ripple="false" ios:shadowRadius="5">
            <Button #button
            [backgroundColor]="color"
            [visibility]="visibility"
            class="label"
            [isEnabled]="!isBusy" 
            [text]="text|uppercase"
            (tap)="onClick($event)"></Button>
        </CardView>
    </StackLayout>        
    `
})

export class BeezButton implements OnChanges{
    @Input() text: string;
    @Input() buttonColor: string;
    @Input() isBusy: boolean;
    @Input() visibility: string ='visible';
    @Input() row: number;
    @Input() col: number;
    @Input() isSelect: boolean;
    @Input() isModal: boolean;
    @Output() buttonClick = new EventEmitter<Event>()
    @ViewChild("button", {static: true}) button: ElementRef;
    color: any;
    constructor() {
    }

    ngOnChanges(changes) {
        this.setColor();
        if (this.isBusy) this.button.nativeElement.text= "Loading ...";
        else this.button.nativeElement.text= this.text;
    }
    
    onClick(args){
        console.log('****** > l☯☯☯l > BeezButton > onClick() > select', this.isSelect);
        console.log('****** > l☯☯☯l > BeezButton > onClick() > modal', this.isModal);
        // d3d0 fix --> clearFocus
        let button = args.object;
        let page: Page = button.page;
        // d3d0 fix --> no select --> IMPORTANT!
        // d3d0 fix --> no modal --> IMPORTANT!
        if(!this.isSelect) {
            if(!this.isModal) {
                if (isIOS) {
                    // IOS CLEARFOCUS
                    page.nativeView.endEditing(true);
                } else {
                    // ANDROID CLEARFOCUS
                    // d3d0 fix --> non funziona su android è undefined!
                    // let field: TextField = page.getViewById("field"); 
                    // field.nativeView.clearFocus();
                    // field.dismissSoftInput();
                    // utils.ad.dismissSoftInput();
                }
            }   
        }
        // d3d0 fix --> clearFocus

        if(!this.isBusy) this.buttonClick.emit();
        this.setColor();
    }

    setColor(){
        switch (this.buttonColor) {
            case "blue":
            this.color = "#5A82FF"
            break;
            case "green":
            this.color = "#00D796"
            break;
            case "black":
            this.color = "#1E1E1E"
            break;
            default:
            this.color = "#00D796"
            break;
        }
    }
}

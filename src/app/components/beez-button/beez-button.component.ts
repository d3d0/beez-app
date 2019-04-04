import { Component, Input, Output, EventEmitter,ViewChild, ElementRef, OnChanges  } from "@angular/core";
import { Color } from "tns-core-modules/color";

@Component({
    selector: "BeezButton",
    moduleId: module.id,
    styleUrls: ['./beez-button.component.css'],
    template: `
    <StackLayout class="container" [row]="row" [col]="col" android:marginBottom="13">
        <CardView width="100%" elevation="2" radius="15" shadowOpacity="0.2" ripple="false" ios:shadowRadius="5">
            <Button #button
            [backgroundColor]="color"
            [visibility]="visibility"
            class="label"
            [isEnabled]="!isBusy" 
            [text]="text|uppercase"
            (tap)="onClick()"></Button>
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
    @Output() buttonClick = new EventEmitter<string>()
    @ViewChild("button") button: ElementRef;
    color
    constructor() {

    }

    ngOnChanges(changes) {
        this.setColor()
        if(this.isBusy) this.button.nativeElement.text= "Loading ..."
            else this.button.nativeElement.text= this.text
        }
    
    onClick(){
        if(!this.isBusy) this.buttonClick.emit()
            this.setColor()

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

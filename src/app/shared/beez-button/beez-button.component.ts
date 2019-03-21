import { Component, Input, Output, EventEmitter,ViewChild, ElementRef, OnChanges  } from "@angular/core";
import { Color } from "tns-core-modules/color";

@Component({
    selector: "BeezButton",
    moduleId: module.id,
    styleUrls: ['./beez-button.component.css'],
    template: `
    <StackLayout class="container">
        <CardView width="100%" elevation="2" radius="15" shadowOpacity="0.2" ripple="false" ios:shadowRadius="5">
        <Button #button
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
    @Input() backgroundColor: string;
    @Input() isBusy: boolean;
    @Output() buttonClick = new EventEmitter<string>()
    @ViewChild("button") button: ElementRef;

    constructor() {}
    ngOnChanges(changes) {
        if(this.isBusy) this.button.nativeElement.text= "Loading ..."
        else this.button.nativeElement.text= this.text
    }
    onClick(){
        if(!this.isBusy) this.buttonClick.emit()
    }
}

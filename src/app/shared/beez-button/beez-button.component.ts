import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Color } from "tns-core-modules/color";

@Component({
    selector: "BeezButton",
    moduleId: module.id,
    styleUrls: ['./beez-button.component.css'],
    template: `
    <StackLayout class="container">
        <CardView width="100%" elevation="2" radius="15" shadowOpacity="0.2" ripple="false" ios:shadowRadius="5">
        <Button
          class="label"
          [isEnabled]="!isBusy" 
          [text]="text|uppercase"
          (tap)="onClick()"></Button>
        </CardView>
    </StackLayout>        
    `
})

export class BeezButton {
    @Input() text: string;
    @Input() backgroundColor: string;
    @Input() isBusy: boolean;
    @Output() buttonClick = new EventEmitter<string>()

    constructor() {}

    onClick(){
        if(!this.isBusy) this.buttonClick.emit()
    }
}

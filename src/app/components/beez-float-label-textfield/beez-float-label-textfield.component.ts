import { Component, ElementRef, Input, Output, ViewContainerRef, EventEmitter, ViewChild } from "@angular/core";
import { Color } from "tns-core-modules/color";

@Component({
    selector: "BeezFloatLabelTextfield",
    moduleId: module.id,
    styleUrls: ['./beez-float-label-textfield.component.scss'],
    template: `
        <GridLayout rows="10, 32">
            <Label [visibility]="editable?'visible':'hidden'" #label row="1" [text]="placeholder|uppercase" opacity="0" class="label" verticalAlignment="bottom"></Label>
            <TextField #textField row="1" ios:paddingBottom="8" class="title"
            [(ngModel)]="text"
            [hint]="placeholder|titlecase"
            [secure]="secure"
            [keyboardType]="keyboardType"
            [editable]="editable"
            (blur)="onBlur($event)"
            (focus)="onFocus()"
            (ngModelChange)="changeValue()"
            (returnPress)="changeValue()"
            autocorrect="false"
            lineHeight="200"
            [returnKeyType]="returnKeyType"
            autocapitalizationType="none"
            ></TextField>
        </GridLayout>
    `
})

export class BeezFloatLabelTextfield {
    @Input() placeholder: string;
    @Input() secure: boolean;
    @Input() text: string;
    @Input() editable: boolean = true;
    @Input() returnKeyType: string;
    @Input() keyboardType: string;
    @Output() textfieldEvent = new EventEmitter<string>()

    @ViewChild("label", {static: false}) label: ElementRef;
    @ViewChild("textField", {static: false}) textField: ElementRef;
    
    constructor() { }

    onFocus() {
        const label = this.label.nativeElement;
        const textField = this.textField.nativeElement;
        label.animate({
            translate: { x: 0, y: - 25 },
            opacity: 1,
        }).then(() => {}, () => { });
        textField.style.placeholderColor= new Color("transparent");
        textField.borderBottomColor = new Color('#5A82FF');
    }

    onBlur($event) {
        const label = this.label.nativeElement;
        const textField = this.textField.nativeElement;
        if (!textField.text) {
            label.animate({
                translate: { x: 0, y: 0 },
                opacity: 0
            }).then(() => {
                // reset border bottom color.
                textField.style.placeholderColor= new Color("#8E8E8E");
                textField.borderBottomColor = new Color('#DDDDDD'); 
            }, () => { });
        }
    }
    
    changeValue(){
        this.textfieldEvent.emit(this.text)
    }

}

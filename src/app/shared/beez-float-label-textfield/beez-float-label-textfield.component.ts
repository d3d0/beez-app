import { Component, ElementRef, Input, Output, ViewContainerRef, EventEmitter, ViewChild } from "@angular/core";
import { Color } from "tns-core-modules/color";

@Component({
    selector: "BeezFloatLabelTextfield",
    moduleId: module.id,
    styleUrls: ['./beez-float-label-textfield.component.css'],
    template: `
    <GridLayout rows="10, auto" ios:paddingTop="16" android:paddingTop="8"   >
    <Label #label row="1" [text]="placeholder|uppercase" opacity="0" class="label" verticalAlignment="bottom"></Label>
    <TextField #textField row="1" ios:paddingBottom="12" class="title"
    [text]='value'
    [hint]="placeholder|titlecase"
    [secure]="secure"
    [keyboardType]="keyboardType"
    [editable]="editable"
    (blur)="onBlur($event)"
    (focus)="onFocus()"
    (returnPress)="returnPress($event)"
    autocorrect="false"
    lineHeight="200"
    autocapitalizationType="none"
    ></TextField>
    </GridLayout>
    `
})

export class BeezFloatLabelTextfield {
    @Input() placeholder: string;
    @Input() secure: boolean;
    @Input() editable: boolean = true;
    @Input() returnKeyType: string;
    @Input() keyboardType: string;
    @Output() textfieldEvent = new EventEmitter<string>()

    @ViewChild("label") label: ElementRef;
    @ViewChild("textField") textField: ElementRef;
    private value;
    
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
        this.textfieldEvent.emit($event)
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
    
    returnPress($event){
        this.textfieldEvent.emit($event)
    }

}

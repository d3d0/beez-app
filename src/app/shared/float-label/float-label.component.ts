import { Component, ElementRef, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { Color } from "tns-core-modules/color";

@Component({
    selector: "FloatLabel",
    moduleId: module.id,
    template: `
    <GridLayout rows="30, auto" marginBottom="5">
    <Label #label row="1" [text]="placeholder" opacity="0" class="label" verticalAlignment="bottom" marginBottom="10"></Label>
    <TextField #textField row="1" paddingBottom="10" class="title"
    [secure]="secure"
    (textChange)="textChange()"
    (onReturn)="textChange()"
    (focus)="onFocus()"
    [(ngModel)]="value"
    [hint]="placeholder|titlecase"
    (blur)="onBlur()"
    keyboardType="email"
    returnKeyType="next"
    borderBottomWidth="1"
    borderBottomColor="#cec8c8"
    autocorrect="false"
    autocapitalizationType="none"
    ></TextField>
    </GridLayout>
    `
})
export class FloatLabel {
    @Input() placeholder: string;
    @Input() secure: boolean;
    @Input() type: string;
    @Output() textfieldEvent = new EventEmitter<string>()

    @ViewChild("label") label: ElementRef;
    @ViewChild("textField") textField: ElementRef;
    private value;
    constructor() {
    }

    ngOnInit(): void {
    }

    onFocus() {
        const label = this.label.nativeElement;
        const textField = this.textField.nativeElement;
        // animate the label sliding up and less transparent.
        label.animate({
            translate: { x: 0, y: - 25 },
            opacity: 1,
        }).then(() => { }, () => { });
            // set the border bottom color to green to indicate focus
            textField.style.placeholderColor= new Color("transparent");
            textField.borderBottomColor = new Color('#5A82FF');
    }

    onBlur() {
        const label = this.label.nativeElement;
        const textField = this.textField.nativeElement;
        // if there is text in our input then don't move the label back to its initial position.
        if (!textField.text) {
            label.animate({
                translate: { x: 0, y: 0 },
                opacity: 0
            }).then(() => {
                // reset border bottom color.
                textField.style.placeholderColor= new Color("#DDDDDD");
                textField.borderBottomColor = new Color('#DDDDDD'); 
            }, () => { });
        }
    }

textChange(){
    console.log(this.value)
    this.textfieldEvent.emit(this.value)
}
}

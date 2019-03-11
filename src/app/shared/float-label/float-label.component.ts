import { Component, ElementRef, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { Color } from "tns-core-modules/color";

@Component({
    selector: "FloatLabel",
    moduleId: module.id,
    template: `
    <GridLayout rows="10, auto" marginBottom="0">
    <Label #label row="1" [text]="placeholder" opacity="0" class="label" verticalAlignment="bottom" marginBottom="16"></Label>
    <TextField #textField row="1" paddingBottom="12" class="title"
    [secure]="secure"
    (focus)="onFocus()"
    [(ngModel)]="value"
    [hint]="placeholder|titlecase"
    (blur)="onBlur()"
    keyboardType="email"
    returnKeyType="next"
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
        this.textfieldEvent.emit(this.value)
        const label = this.label.nativeElement;
        const textField = this.textField.nativeElement;
        // if there is text in our input then don't move the label back to its initial position.
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
}

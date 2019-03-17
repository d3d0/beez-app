import { Component, ElementRef, Input, Output, ViewContainerRef, EventEmitter, ViewChild } from "@angular/core";
import { Color } from "tns-core-modules/color";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { SelectDateModalViewComponent } from "../../shared/select-date-modal-view/select-date-modal-view.component";
import { formatDate } from '@angular/common';

@Component({
    selector: "FloatLabel",
    moduleId: module.id,
    template: `
    <GridLayout rows="10, auto" marginBottom="20">
        <Label #label row="1" [text]="placeholder|uppercase" opacity="0" class="label" verticalAlignment="bottom" marginBottom="16"></Label>
        <TextField #textField row="1" ios:paddingBottom="12" android:paddingBottom="18" class="title"
        [secure]="secure"
        (focus)="onFocus()"
        lineHeight="200"
        [(ngModel)]="value"
        [editable]="editable"
        [hint]="placeholder|titlecase"
        (blur)="onBlur()"
        [keyboardType]="type"
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
    @Input() inModal: boolean = false;
    @Input() last: boolean;
    @Input() editable: boolean = true;
    @Input() type: string;
    @Output() textfieldEvent = new EventEmitter<string>()

    @ViewChild("label") label: ElementRef;
    @ViewChild("textField") textField: ElementRef;
    private value;
    
    constructor(
        private vcRef: ViewContainerRef,
        private modal: ModalDialogService) { }

    ngOnInit(): void {
        if (this.last){
            const textField = this.textField.nativeElement;
            textField.marginBottom = 0
        }
    }

    onFocus() {
        const label = this.label.nativeElement;
        const textField = this.textField.nativeElement;
        // animate the label sliding up and less transparent.
        label.animate({
            translate: { x: 0, y: - 25 },
            opacity: 1,
        }).then(() => {}, () => { });
            // set the border bottom color to green to indicate focus
            textField.style.placeholderColor= new Color("transparent");
            textField.borderBottomColor = new Color('#5A82FF');
         if (this.inModal) this.createModelView().then(
            result => {
                console.log('result',result)
                this.value = result
                this.textField.nativeElement.text=formatDate(result, 'dd-MM-yyyy','');
            })
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

    private createModelView(): Promise<any> {
    const textField = this.textField.nativeElement;
    const today = textField.text? new Date(textField.text): new Date();
    const options: ModalDialogOptions = {
      context: { title: "CASTINGS.PARTICIPATION_AGENCY_SELECT_TITLE", currentdate: today },
      fullscreen: true,
      viewContainerRef: this.vcRef
    };
    return this.modal.showModal(SelectDateModalViewComponent, options);
  }

}

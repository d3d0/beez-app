import { Component, ElementRef, Input, Output, ViewContainerRef, EventEmitter, ViewChild } from "@angular/core";

@Component({
    selector: "BeezInlineTextfield",
    moduleId: module.id,
    styleUrls: ['./beez-inline-textfield.component.css'],
    template: `
        <StackLayout orientation="horizontal">
            <Label [text]="placeholder"></Label>
            <TextField ios:paddingBottom="8" class="title"
            [(ngModel)]="text"
            [hint]="placeholder|titlecase"
            [keyboardType]="keyboardType"
            [editable]="editable"
            (ngModelChange)="changeValue()"
            (returnPress)="changeValue()"
            autocorrect="false"
            [returnKeyType]="returnKeyType"
            autocapitalizationType="none"
            ></TextField>
        </StackLayout>
    `
})

export class BeezInlineTextfield {
    @Input() placeholder: string;
    @Input() secure: boolean;
    @Input() text: string;
    @Input() editable: boolean = true;
    @Input() returnKeyType: string;
    @Input() keyboardType: string;
    @Output() textfieldEvent = new EventEmitter<string>()
    
    constructor() { }

    changeValue(){
        this.textfieldEvent.emit(this.text)
    }

}

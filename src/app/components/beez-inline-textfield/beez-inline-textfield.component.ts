import { Component, ElementRef, Input, Output, ViewContainerRef, EventEmitter, ViewChild } from "@angular/core";

@Component({
    selector: "BeezInlineTextfield",
    moduleId: module.id,
    styleUrls: ['./beez-inline-textfield.component.css'],
    template: `
        <StackLayout [borderWidth]="last?0:1" orientation="horizontal">
            <Label class="label-gray" [text]="placeholder"></Label>
            <TextField #textField ios:paddingBottom="8" class="title"
                width="100%"
                [(ngModel)]="text"
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
    @Input() last: boolean;
    @Input() text: string;
    @Input() editable: boolean = true;
    @Input() returnKeyType: string;
    @Input() keyboardType: string;
    @Output() textfieldEvent = new EventEmitter<string>()
    @ViewChild("textField") textField: ElementRef;

    constructor() { }
    
    changeValue(){
        this.textfieldEvent.emit(this.text)
    }

}

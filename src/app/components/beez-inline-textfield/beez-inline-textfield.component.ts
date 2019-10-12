import { Component, ElementRef, Input, Output, ViewContainerRef, EventEmitter, ViewChild } from "@angular/core";
import { TextField } from "tns-core-modules/ui/text-field";


@Component({
    selector: "BeezInlineTextfield",
    moduleId: module.id,
    styleUrls: ['./beez-inline-textfield.component.scss'],
    template: `
        <StackLayout [borderWidth]="last?0:1" orientation="horizontal">
            <Label class="label-textfield" [text]="placeholder"></Label>
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
                (blur)="onBlur($event)" 
            ></TextField>
        </StackLayout>
    `
})

export class BeezInlineTextfield {
    @Input() placeholder: string;
    @Input() secure: boolean;
    @Input() last: boolean;
    @Input() text: string;
    @Input() type: string;
    @Input() editable: boolean = true;
    @Input() returnKeyType: string;
    @Input() keyboardType: string;
    @Output() textfieldEvent = new EventEmitter<string>()
    @ViewChild("textField", {static: false}) textField: ElementRef;

    constructor() { }
    
    changeValue(){
        this.textfieldEvent.emit(this.text)
    }

    onBlur(args) {
        // textfield
        // let textField = <TextField>args.object;

        console.log('l☯☯☯l > BeezInlineTextfield > onBlur() > type: ', this.type);
        
        // d3d0 fix --> validation
        let numero = Number(this.text);
        console.log('l☯☯☯l > BeezInlineTextfield > onBlur() > numero is number: ', isNaN(numero));
        if(isNaN(numero)){
            this.text='';
            alert('Inserire misura in centimetri');
            return;
        }
        // d3d0 fix --> validation
    }

}

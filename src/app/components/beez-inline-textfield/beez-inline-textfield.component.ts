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
                [hint]="hint"
            ></TextField>
        </StackLayout>
    `
})

export class BeezInlineTextfield {
    @Input() hint: string;
    @Input() placeholder: string;
    @Input() secure: boolean;
    @Input() last: boolean;
    @Input() text: string;
    @Input() type: string;
    @Input() isFacebook: boolean = false;
    @Input() isInsta: boolean = false;
    @Input() isLinkedin: boolean = false;
    @Input() editable: boolean = true;
    @Input() returnKeyType: string;
    @Input() keyboardType: string;
    @Output() textfieldEvent = new EventEmitter<string>()
    @ViewChild("textField", {static: false}) textField: ElementRef;

    constructor() {
        if(this.isFacebook==true && this.text == null) {
            this.hint = 'username';
        }
        if(this.isInsta==true && this.text == null) {
            this.hint = 'username';
        }
        if(this.isLinkedin==true && this.text == null) {
            this.hint = 'username';
        }
    }

    changeValue(){
        this.textfieldEvent.emit(this.text)
    }

    onBlur(args) {
        // textfield
        // let textField = <TextField>args.object;

        console.log('l☯☯☯l > BeezInlineTextfield > onBlur() > text: ', this.text);
        console.log('l☯☯☯l > BeezInlineTextfield > onBlur() > hint: ', this.hint);
        console.log('l☯☯☯l > BeezInlineTextfield > onBlur() > isFacebook: ', this.isFacebook);
        console.log('l☯☯☯l > BeezInlineTextfield > onBlur() > isInsta: ', this.isInsta);
        console.log('l☯☯☯l > BeezInlineTextfield > onBlur() > isLinkedin: ', this.isLinkedin);
        console.log('l☯☯☯l > BeezInlineTextfield > onBlur() > type: ', this.type);
        
        // d3d0 fix --> validation
        if(this.type == 'number') {
            let numero = Number(this.text);
            console.log('l☯☯☯l > BeezInlineTextfield > onBlur() > numero is number: ', isNaN(numero));
            if(isNaN(numero)){
                this.text='';
                alert('Inserire la misura in centimetri!');
                return;
            }
        }
        // d3d0 fix --> validation
    }

}

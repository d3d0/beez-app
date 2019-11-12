import { Component, ViewChild, ElementRef, OnInit, Input, Output, EventEmitter,ViewContainerRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { TaxonomyService} from "../../shared/taxonomy.service";
import { Observable } from "rxjs";
import { Page } from "tns-core-modules/ui/page";
import { EventData } from "tns-core-modules/data/observable";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import { Color } from "tns-core-modules/color";
import { Frame } from "tns-core-modules/ui/frame";

// import { Color } from 'color';
import * as utils from 'utils/utils';

interface Term {
    vid:string;
    tid:string;
    name:string;
}

@Component({
    selector: 'ns-select-modal',
    templateUrl: './select-modal-view.component.html',
    styleUrls: ['./select-modal-view.component.scss'],
    moduleId: module.id,
})

export class SelectModalViewComponent implements OnInit {
    @ViewChild('picker', {static: false}) picker: ElementRef;
    private picked:string;
    private list;
    public vocabolary;
    private title;
    private vid;
    private tid;
    private isSelect = false;
    public index: number = 0;
    private terms: Observable<Term[]>;
    private termini: Array<Term>;
    
    constructor(
        private _params: ModalDialogParams, 
        private taxonomyService: TaxonomyService, 
        private routerExtensions: RouterExtensions,
        private page:Page,
        private frame:Frame,
        private _vcRef: ViewContainerRef
    ) {
        this.vocabolary = _params.context.vocabolary;
        this.title = _params.context.title;
        this.tid = _params.context.tid;
        if(_params.context.isSelect) this.isSelect = _params.context.isSelect;
        console.log('°°°°°° > l☯☯☯l > SelectModalViewComponent > constructor() > params',this._params);
        console.log('°°°°°° > l☯☯☯l > SelectModalViewComponent > constructor() > isSelect',this.isSelect);
        
    }

    ngOnInit() {
        // this.terms = this.taxonomyService.getVocabolary(this.vocabolary);
        // console.log('terms',this.Term);

        this.taxonomyService.getVocabolary(this.vocabolary).subscribe(data=> {
            this.termini = data;
        })
        
        Object.keys(this.termini).forEach(key => {
            // console.log('°°°°°° > l☯☯☯l > SelectModalViewComponent > ngOnInit() > tax term: ', this.termini[key].tid);
            if (this.termini[key].tid == this.tid) {
                console.log('°°°°°° > l☯☯☯l > SelectModalViewComponent > ngOnInit() > TROVATO');
                console.log('°°°°°° > l☯☯☯l > SelectModalViewComponent > ngOnInit() > tax term: ', this.termini[key].tid);
                this.index = parseInt(key);
            }
        });        
    }

    onLoadedRad(args: EventData) { }

    onClose() {
        let picker = this.picker.nativeElement;
        this.picked = picker.items[picker.selectedIndex];
        this._params.closeCallback(this.picked);
        // console.log('°°°°°° > l☯☯☯l > SelectModalViewComponent > onClose() > picker.selectedIndex',picker.selectedIndex);
        // console.log('°°°°°° > l☯☯☯l > SelectModalViewComponent > onClose() > picked',this.picked);
    }

    onBack(): void {
        console.log("onback");
        this._params.closeCallback();
    }
}
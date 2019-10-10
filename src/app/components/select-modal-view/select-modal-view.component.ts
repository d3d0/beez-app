import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { TaxonomyService} from "../../shared/taxonomy.service";
import { Observable } from "rxjs";

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
    public index: number = 0;
    private terms: Observable<Term[]>;
    private termini: Array<Term>;
    
    constructor(
        private _params: ModalDialogParams, 
        private taxonomyService: TaxonomyService, 
        private routerExtensions: RouterExtensions
    ) {
        this.vocabolary = _params.context.vocabolary;
        this.title = _params.context.title;
        this.tid = _params.context.tid;
        // console.log('°°°°°° > l☯☯☯l > SelectModalViewComponent > constructor() > params',this._params);
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
                // console.log('°°°°°° > l☯☯☯l > SelectModalViewComponent > ngOnInit() > TROVATO');
                // console.log('°°°°°° > l☯☯☯l > SelectModalViewComponent > ngOnInit() > tax term: ', this.termini[key].tid);
                this.index = parseInt(key);
            }
        });
    }

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
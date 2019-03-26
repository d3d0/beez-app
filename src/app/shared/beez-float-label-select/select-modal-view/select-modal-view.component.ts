import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { TaxonomyService} from "../../taxonomy.service";
import { Observable, of, BehaviorSubject, throwError } from "rxjs";
import { map, combineLatest, filter, retry } from "rxjs/operators";
interface Term {
    vid:string;
    tid:string;
    name:string;
}

@Component({
    selector: 'ns-select-modal',
    templateUrl: './select-modal-view.component.html',
    styleUrls: ['./select-modal-view.component.css'],
    moduleId: module.id,
})

export class SelectModalViewComponent implements OnInit {
    @ViewChild('picker') picker: ElementRef;
    private picked:string
    private list
    public vocabolary
    private title
    private vid
    public taxonomyService: TaxonomyService;
    public index: number = 0;
    private terms: Observable<Term[]>;
    
    constructor(private _params: ModalDialogParams, taxonomyService: TaxonomyService, private routerExtensions: RouterExtensions ) {
        this.vocabolary = _params.context.vocabolary;
        this.title = _params.context.title;
        this.taxonomyService = taxonomyService;
    }

    ngOnInit(){
        this.terms = this.taxonomyService.getVocabolary(this.vocabolary)
    }

    onClose() {
        let picker = this.picker.nativeElement
        this.picked = picker.items[picker.selectedIndex];
        console.log(this.picked)
        this._params.closeCallback(this.picked);
    }

    onBack(): void {
        console.log("onback")
        this._params.closeCallback();
    }

    // selectedIndexChanged(args) {
        //     // let picker = <ListPicker>args.object;
        // // 
        // }

    }
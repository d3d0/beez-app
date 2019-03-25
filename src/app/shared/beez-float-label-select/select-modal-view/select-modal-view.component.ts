import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { TaxonomyService} from "../../taxonomy.service";
import { Observable, of, BehaviorSubject, throwError } from "rxjs";
import { map, combineLatest, filter, retry } from "rxjs/operators";

@Component({
    selector: 'ns-select-modal',
    templateUrl: './select-modal-view.component.html',
    styleUrls: ['./select-modal-view.component.css'],
    moduleId: module.id,
})

export class SelectModalViewComponent implements AfterViewInit {
    @ViewChild('picker') picker: ElementRef;
    private picked:string
    private list
    public vocabolary
    private title
    private vid
    public store: TaxonomyService;

    constructor(private _params: ModalDialogParams, store: TaxonomyService, private routerExtensions: RouterExtensions ) {
        this.vocabolary = _params.context.vid;
        this.vid = store.getVId(this.vocabolary)
        this.title = _params.context.title;
        this.store = store;
    }
    ngAfterViewInit(){
        this.load()
    } 

    private load() {
        this.store.load()
        .subscribe(
            () => {console.log('store loaded')},
            () => {
                alert("An error occurred loading your list.");
            }
            );
    }
    getList(){
        console.log(this.vid)
            return this.store.getVocabolary(this.vocabolary).pipe(filter( el=> el.vid == this.vid))
    }

    alphabeticalSort(a, b) {
        const aQ = a.name.toUpperCase();
        const bQ = b.name.toUpperCase();
        return aQ.localeCompare(bQ);
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

    selectedIndexChanged(args) {
        // let picker = <ListPicker>args.object;
    }
    
}
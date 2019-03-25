import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { TaxonomyService} from "../../taxonomy.service";

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
    private vid
    private title
    public store: TaxonomyService;

    constructor(private _params: ModalDialogParams, store: TaxonomyService, private routerExtensions: RouterExtensions ) {
        this.vid = _params.context.vid;
        this.title = _params.context.title;
        this.store = store;
    }
    ngAfterViewInit(){
        this.load()
    } 

    private load() {
        this.store.load(this.vid)
        .subscribe(
            () => {},
            () => {
                alert("An error occurred loading your list.");
            }
            );
    }
    getList(){
        this.store.getVocabolary(this.vid)
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
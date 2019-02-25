import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { ListPicker } from "tns-core-modules/ui/list-picker";

@Component({
    selector: 'ns-details',
    templateUrl: './select-modal-view.component.html',
    styleUrls: ['./select-modal-view.component.css'],
    moduleId: module.id,
})

export class SelectModalViewComponent {
    private picked
    private list
    constructor(private _params: ModalDialogParams, private router: RouterExtensions ) {
        this.list = _params.context.list;
    }

    onNavigate(): void {
        this.router.back();
    }

    public onClose() {
        this._params.closeCallback(this.list[this.picked]);
    }

    public selectedIndexChanged(args) {
        this.picked = <ListPicker>args.object.selectedIndex;
    }
    
}
import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, AfterViewInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { TabView } from "tns-core-modules/ui/tab-view";
import { localize } from "nativescript-localize";
import { ListViewEventData } from "nativescript-ui-listview";
import { ObservableArray } from "tns-core-modules/data/observable-array";


import { Casting} from "../casting.model";
import { CastingsService} from "../castings.service";

@Component({
  selector: 'ns-castings-list',
  templateUrl: './castings-list.component.html',
  styleUrls: ['./castings-list.component.css'],
  moduleId: module.id,
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class CastingsListComponent implements AfterViewInit {

  @Input() castingType: string;
  @Output() loading = new EventEmitter();
  @Output() loaded = new EventEmitter();

  public store: CastingsService;

  castings: Casting[];
  listLoaded = false;

  constructor(store: CastingsService, private routerExtensions: RouterExtensions) {
    this.castings = store.load();
  }

  get dataItems(): ObservableArray<Casting> {
    return this.castings;
  }

  ngAfterViewInit() {
    // console.log(this.castings)
      // this.load();
  }

  load() {
    // this.loading.next("");
    // this.castings = this.store.load()
    // this.store.load()
      // .subscribe(
      //   () => {c
      //     this.loaded.next("");
      //     this.listLoaded = true;
      //   },
      //   () => {
      //     alert("An error occurred loading your grocery list.");
      //   }
      // );
  }


    ngOnInit() {
        this._dataItems = new ObservableArray(this._dataItemService.getDataItems());
    }


  showActivityIndicator() {
    // this.isLoading = true;
    console.log('showActivityIndicator')
  }

  hideActivityIndicator() {
    console.log('hideActivityIndicator')
    // this.isLoading = false;
  }

  onCarItemTap(args: ListViewEventData): void {

    const tappedCasting = args.view.bindingContext;
    this.routerExtensions.navigate(["/home/castings/detail", tappedCasting.id],
        {
            animated: true,
            transition: {
                name: "slide",
                duration: 200,
                curve: "ease"
            }
        });
    }
}

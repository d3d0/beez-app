import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, OnInit } from "@angular/core";
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
  providers: [CastingsService],
  moduleId: module.id,
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class CastingsListComponent implements OnInit {

  @Input() castingType: string;
  @Output() loading = new EventEmitter();
  @Output() loaded = new EventEmitter();

  private _castings: ObservableArray<Casting> = new ObservableArray<Casting>([]);
  listLoaded = false;

  constructor(private castingsService: CastingsService, private routerExtensions: RouterExtensions) {}

  get castings(): ObservableArray<Casting> {
    return this._castings;
  }

  ngOnInit() {
      this._castings = new ObservableArray(this.castingsService.getCastings());
  }

  showActivityIndicator() {
    // this.isLosading = true;
    console.log('showActivityIndicator')
  }

  hideActivityIndicator() {
    console.log('hideActivityIndicator')
  }
}

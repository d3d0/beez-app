import { Component } from '@angular/core';
import { localize } from "nativescript-localize";
import { SegmentedBar, SegmentedBarItem } from "tns-core-modules/ui/segmented-bar";

// NSSegmentView
import { Observable } from 'tns-core-modules/data/observable';
import { NSSegmentView, NSSegmentViewItem } from 'nativescript-segment-view';
import * as elementRegistryModule from 'nativescript-angular/element-registry';
elementRegistryModule.registerElement("NSSegmentView", () => require("nativescript-segment-view").NSSegmentView);

@Component({
  selector: 'ns-castings',
  templateUrl: './castings.component.html',
  styleUrls: ['./castings.component.css'],
  moduleId: module.id,
})
// NSSegmentView
export class CastingsComponent extends Observable {
// export class CastingsComponent {
	ongoingTitle = localize("CASTINGS.ONGOING");
	attendTitle =localize("CASTINGS.ATTEND");
	concludedTitle =localize("CASTINGS.CONCLUDED");
  public tabs: Array<SegmentedBarItem>;
  public selectedIndex = 0;

  // NSSegmentView
  private segmentView: NSSegmentView;
  private tabItems: NSSegmentViewItem[];
    constructor() {
      // NSSegmentView
      super();

      // this.tabs = [];
      // let segmentedBarItem0 = <SegmentedBarItem>new SegmentedBarItem();
      // segmentedBarItem0.title = localize("CASTINGS.ONGOING");
      // let segmentedBarItem1 = <SegmentedBarItem>new SegmentedBarItem();
      // segmentedBarItem1.title = localize("CASTINGS.ATTEND");
      // let segmentedBarItem2 = <SegmentedBarItem>new SegmentedBarItem();
      // segmentedBarItem2.title = localize("CASTINGS.CONCLUDED");
      // this.tabs.push(segmentedBarItem0);
      // this.tabs.push(segmentedBarItem1);
      // this.tabs.push(segmentedBarItem2);

      // NSSegmentView
      this.tabItems = [];
      const item1 = new NSSegmentViewItem();
      item1.title = localize("CASTINGS.ONGOING");
      this.tabItems.push(item1);
      const item2 = new NSSegmentViewItem();
      item2.title = localize("CASTINGS.ATTEND");
      this.tabItems.push(item2);
      const item3 = new NSSegmentViewItem();
      item3.title = localize("CASTINGS.CONCLUDED");
      this.tabItems.push(item3);
    }

    public onSelectedIndexChange(args) {
        let segmetedBar = <SegmentedBar>args.object;
        this.selectedIndex = segmetedBar.selectedIndex;
    }
    deActivityIndicator() {
      // this.isLoading = true;
      console.log('hideActivityIndicator')
    }
	  showActivityIndicator() {
      // this.isLoading = true;
      console.log('showActivityIndicator')
    }
}

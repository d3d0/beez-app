import { Component } from '@angular/core';
import { localize } from "nativescript-localize";
import { SegmentedBar, SegmentedBarItem } from "tns-core-modules/ui/segmented-bar";

@Component({
  selector: 'ns-castings',
  templateUrl: './castings.component.html',
  styleUrls: ['./castings.component.css'],
  moduleId: module.id,
})
export class CastingsComponent  {
	ongoingTitle = localize("CASTINGS.ONGOING");
	attendTitle =localize("CASTINGS.ATTEND");
	concludedTitle =localize("CASTINGS.CONCLUDED");
  public tabs: Array<SegmentedBarItem>;
  public selectedIndex = 0;

    constructor() {
      this.tabs = [];
      let segmentedBarItem0 = <SegmentedBarItem>new SegmentedBarItem();
      segmentedBarItem0.title = localize("CASTINGS.ONGOING");
      let segmentedBarItem1 = <SegmentedBarItem>new SegmentedBarItem();
      segmentedBarItem1.title = localize("CASTINGS.ONGOING");
      let segmentedBarItem2 = <SegmentedBarItem>new SegmentedBarItem();
      segmentedBarItem2.title = localize("CASTINGS.ONGOING");
      this.tabs.push(segmentedBarItem0);
      this.tabs.push(segmentedBarItem1);
      this.tabs.push(segmentedBarItem2);
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

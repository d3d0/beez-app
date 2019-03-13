import { Component, OnInit, Input} from '@angular/core';
import { Profile } from "../../user/profile.model";
import * as imagepicker from "nativescript-imagepicker";

@Component({
  selector: 'ns-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
  moduleId: module.id,
})
export class MediaComponent {
  @Input() profile
    imageAssets = [];
    imageSrc: any;
    isSingleMode: boolean = false;
    thumbSize: number = 80;
    previewSize: number = 300;

    public onSelectMultipleTap() {
        this.isSingleMode = false;

        let context = imagepicker.create({
            mode: "multiple"
        });
        this.startSelection(context);
    }

    public onSelectSingleTap() {
        this.isSingleMode = true;

        let context = imagepicker.create({
            mode: "single"
        });
        this.startSelection(context);
    }

    private startSelection(context) {
        let that = this;

        context
        .authorize()
        .then(() => {
            that.imageAssets = [];
            that.imageSrc = null;
            return context.present();
        })
        .then((selection) => {
            console.log("Selection done: " + JSON.stringify(selection));
            that.imageSrc = that.isSingleMode && selection.length > 0 ? selection[0] : null;

            // set the images to be loaded from the assets with optimal sizes (optimize memory usage)
            selection.forEach(function (element) {
                element.options.width = that.isSingleMode ? that.previewSize : that.thumbSize;
                element.options.height = that.isSingleMode ? that.previewSize : that.thumbSize;
            });

            that.imageAssets = selection;
        }).catch(function (e) {
            console.log(e);
        });
    }
}
import { Component, OnInit, Input} from '@angular/core';
import { Profile } from "../../user/profile.model";
import * as imagepicker from "nativescript-imagepicker";
import * as bgHttp from "nativescript-background-http";
import { isIOS } from "platform";
import { ObservableArray } from "data/observable-array";
import * as fs from "file-system";
import { BackendService } from "../../shared/backend.service";

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
    public tasks: bgHttp.Task[] = [];
    public events: { eventTitle: string, eventData: any }[] = [];
    private file: string;
    private url: string;
    private counter: number = 0;
    private session: any;

    constructor() {
        this.file = fs.path.normalize(fs.knownFolders.currentApp().path + "/home/bigpic.jpg");

        this.url = BackendService.baseUrl + "beez/media_images_upload/"+BackendService.UID ,

        this.session = bgHttp.session("image-upload");
    }

    upload(args) {
        this.start_upload(false, false);
    }

    upload_error(args) {
        this.start_upload(true, false);
    }

    upload_multi(args) {
        this.start_upload(false, true);
    }

    start_upload(should_fail, isMulti) {
        console.log((should_fail ? "Testing error during upload of " : "Uploading file: ") + this.file + (isMulti ? " using multipart." : ""));

        const name = this.file.substr(this.file.lastIndexOf("/") + 1);
        const description = `${name} (${++this.counter})`;
        let headers = BackendService.getCommonHeaders()
        headers["Content-Type"] = "application/octet-stream"
        headers["File-Name"] = "nome file "
        const request = {
            url: this.url,
            method: "POST",
            headers: headers,
            description: description,
            androidAutoDeleteAfterUpload: false,
            androidNotificationTitle: 'NativeScript HTTP background',
        };

        if (should_fail) {
            request.headers["Should-Fail"] = true;
        }

        let task: bgHttp.Task;
        let lastEvent = "";
        if (isMulti) {
            const params = [
                { name: "test", value: "value" },
                { name: "fileToUpload", filename: this.imageSrc, mimeType: 'image/jpeg' }
            ];
            task = this.session.multipartUpload(params, request);
        } else {
            task = this.session.uploadFile(this.file, request);
        }

        function onEvent(e) {
            if (lastEvent !== e.eventName) {
                // suppress all repeating progress events and only show the first one
                lastEvent = e.eventName;
            } else {
                return;
            }

            this.events.push({
                eventTitle: e.eventName + " " + e.object.description,
                eventData: JSON.stringify({
                    error: e.error ? e.error.toString() : e.error,
                    currentBytes: e.currentBytes,
                    totalBytes: e.totalBytes,
                    body: e.data
                })
            });
        }

        task.on("progress", onEvent.bind(this));
        task.on("error", onEvent.bind(this));
        task.on("responded", onEvent.bind(this));
        task.on("complete", onEvent.bind(this));
        lastEvent = "";
        this.tasks.push(task);
    }

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
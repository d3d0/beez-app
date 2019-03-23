import { Component, OnInit, Input} from '@angular/core';
import { Profile } from "../../user/profile.model";
import * as imagepicker from "nativescript-imagepicker";
import * as bgHttp from "nativescript-background-http";
import { isIOS } from "platform";
import { ObservableArray } from "data/observable-array";
import * as fs from "file-system";
import { BackendService } from "../../shared/backend.service";
import {ImageSource, fromFile,fromNativeSource, fromResource, fromBase64} from "tns-core-modules/image-source";
import { ProfileService } from "../profile.service"

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
    image_base64: any;
    isSingleMode: boolean = false;
    thumbSize: number = 80;
    previewSize: number = 300;
    public tasks: bgHttp.Task[] = [];
    public events: { eventTitle: string, eventData: any }[] = [];
    private file: string;
    private url: string;
    private counter: number = 0;
    private session: any;
    private images:any = [];

    constructor( private profileService: ProfileService ) {
        this.url = BackendService.baseUrl + "beez/loool_talent_images/upload_image_multipart"
        this.session = bgHttp.session("image-upload");
        this.loadImages()
    }
    loadImages(){
        this.profileService.getImages().subscribe(result => this.images = result )
    }
    deleteImage(fid){
        this.profileService.deleteImage(fid).subscribe(result => this.images = result )
    }
    setPolaroidImage(fid){
        this.profileService.setPolaroidImage(fid).subscribe(result => console.log(result) )
    }

    public onSelectMultipleTap() {
        this.isSingleMode = false;
        let context = imagepicker.create({
            mode: "multiple"
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
            that.imageAssets = that.isSingleMode && selection.length > 0 ? selection[0] : null;
            // set the images to be loaded from the assets with optimal sizes (optimize memory usage)
            selection.forEach(function (element) {
                element.options.width = that.isSingleMode ? that.previewSize : that.thumbSize;
                element.options.height = that.isSingleMode ? that.previewSize : that.thumbSize;
            });
            this.file = selection[0]._android;
        }).catch(function (e) {
            console.log(e);
        });
    }

    start_upload() {
        const name = this.file.substr(this.file.lastIndexOf("/") + 1);
        // this.file = fs.path.normalize(fs.knownFolders.currentApp().path + this.file);
        const description = `${name} (${++this.counter})`;

        let headers = BackendService.getCommonHeaders()
        headers["Content-Type"] = "application/octet-stream"
        headers["Accept"] = 'application/json'
        headers["File-Name"] =  name

        const request = {
            url: this.url,
            method: "POST",
            headers: headers,
            androidAutoDeleteAfterUpload: false,
            androidNotificationTitle: 'BEEEZ',
        };
        let task: bgHttp.Task;
        let lastEvent = "";
        const params = [
        { name: "image12", filename: this.file }
        ];
        task = this.session.multipartUpload(params, request);

        function onEvent(e) {
            console.log(e)
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
}
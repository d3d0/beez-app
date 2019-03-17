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
    private images:any;

    constructor( private profileService: ProfileService ) {
        this.url = BackendService.baseUrl + "beez/loool_talent_profile/media_images_upload/" + BackendService.UID
        this.session = bgHttp.session("image-upload");
        this.loadImages()
    }
    loadImages(){
        this.profileService.getImages().subscribe(result => {
            console.log(result)
            this.images = result} )
    }
    deleteImage(fid){
        this.profileService.deleteImage(fid).subscribe(result => this.images = result )
    }

















//////////////////////////////////////////////////////
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
            that.imageAssets = that.isSingleMode && selection.length > 0 ? selection[0] : null;
            // set the images to be loaded from the assets with optimal sizes (optimize memory usage)
            selection.forEach(function (element) {
                element.options.width = that.isSingleMode ? that.previewSize : that.thumbSize;
                element.options.height = that.isSingleMode ? that.previewSize : that.thumbSize;
            });
            that.file = selection[0]._android;
            let image = fromFile(that.file);
            console.log(image)
            that.image_base64 = image.toBase64String('jpg');
        }).catch(function (e) {
            console.log(e);
        });
    }

    ////////////////////////////////////////////////////////
    upload(args) {
        const name = this.file.substr(this.file.lastIndexOf("/") + 1);
        // this.start_upload(false, true);
        this.profileService.drupal_upload(name, this.image_base64).subscribe(result=>console.log(result))
    }

    start_upload(should_fail, isMulti) {
        console.log( 'this.file ',this.file)
        const name = this.file.substr(this.file.lastIndexOf("/") + 1);
        const description = `${name} (${++this.counter})`;
        const request = {
            url: this.url,
            method: "POST",
            headers:  BackendService.getRawCommonHeaders(),
            description: description,
            androidAutoDeleteAfterUpload: false,
            androidNotificationTitle: 'NativeScript HTTP background',
        };

        let task: bgHttp.Task;
        let lastEvent = "";
        console.log('this.image_base64' ,this.image_base64)
        const params = [
        { name: "fileToUpload", filename: name, file:this.image_base64 }
        ];
        // task = this.session.multipartUpload(params, request);
        task = this.session.uploadFile(this.file, request);

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









}
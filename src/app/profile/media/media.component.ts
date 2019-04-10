import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import * as imagepicker from "nativescript-imagepicker";
import * as bgHttp from "nativescript-background-http";
import { isIOS } from "platform";
import { ObservableArray } from "data/observable-array";
import * as fs from "file-system";
import {ImageSource, fromFile,fromNativeSource, fromResource, fromBase64} from "tns-core-modules/image-source";
import { localize } from "nativescript-localize";

import { Profile } from "../../user/profile.model";
import { BackendService } from "../../shared/backend.service";
import { ProfileService } from "../profile.service"
import { alert, confirm, getIconSource } from "../../shared/utils";

@Component({
    selector: 'ns-media',
    templateUrl: './media.component.html',
    styleUrls: ['./media.component.css'],
    moduleId: module.id,
})
export class MediaComponent {
    @Input() profile
    @Output() refreshProfile = new EventEmitter<string>()
    imageAssets = [];
    imageSrc: any;
    image_base64: any;
    isSingleMode: boolean = false;
    thumbSize: number = 80;
    previewSize: number = 300;
    getIconSource = getIconSource
    public tasks: bgHttp.Task[] = [];
    public events: { eventTitle: string, eventData: any }[] = [];
    private file: string;
    private url: string;
    private counter: number = 0;
    private session: any;
    private images:any = [];
    public isLoading:boolean = false;
    constructor( private profileService: ProfileService ) {
        this.url = BackendService.baseUrl + "beez/loool_talent_images/upload_image_multipart"
        this.session = bgHttp.session("image-upload");
        this.loadImages()
    }
    loadImages(){
        this.profileService.getImages().subscribe( result => {
            this.images = result
            // console.log(result)
        })
    }
    deleteImage(image){
        if(image.polaroid) this.profileService.setPolaroidImage(0).subscribe(
                () => this.refreshProfile.emit(),
                () => alert(localize("ERROR_SERVICE"))
                )
        confirm("DELETE?").then(()=>
            this.profileService.deleteImage(image.fid).subscribe(
                ()=> this.loadImages()),
                ()=> alert(localize("ERROR_SERVICE")
                )
            )
    }
    setPolaroidImage(image){
        confirm("Set as cover image?").then(()=>
            this.profileService.setPolaroidImage(image.fid).subscribe(
                () => this.refreshProfile.emit(),
                () => alert(localize("ERROR_SERVICE"))
                )
            )
    }

    public onSelectMultipleTap() {
        this.isSingleMode = false;
        let context = imagepicker.create({
            mode: "multiple"
        });
        this.startSelection(context);
    }

    private startSelection(context) {
        context
        .authorize()
        .then(() => {
            return context.present();
        }).then((selection) => {
            let counter = 0
            selection.forEach( (selected_item) => {
                let source = new ImageSource();
                source.fromAsset(selected_item).then((image) => {
                    console.log('image', image)
                    // this.images.push(image)
                    if (!isIOS) {
                        var localPath = null;
                        localPath = image.android.toString();
                    } else {
                        let name = new Date().toISOString() +'__'+ counter + ".jpg"
                        let folder = fs.knownFolders.documents();
                        let path = fs.path.join(folder.path, name );
                        let saved = image.saveToFile(path, "jpg");
                        localPath = path;
                    }
                    localPath = localPath 
                    console.log(localPath)
                    var task = this.start_upload("image_" + counter + ".jpg", localPath);
                    this.images.push(({ thumb: localPath, filepath:localPath, uploadTask: 'task' }));
                    counter++
                })
            })
        })
    }









    start_upload(uri, fileUri) {
        this.isLoading = true
        // console.log('uri ', uri)
        // console.log(fileUri)
        const name = this.extractImageName(fileUri);
        const description = `${name} (${++this.counter})`;
        debugger
        let headers = []
        headers["Content-Type"] = "application/octet-stream"
        headers["Accept"] = 'application/json'
        headers["x-csrf-token"] = BackendService.XCSFRtoken
        headers["Cookie"] = BackendService.session_name + "=" + BackendService.sessid

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
        { name: name, filename: fileUri }
        ];
        task = this.session.multipartUpload(params, request);

        function onEvent(e) {
            console.log(e)
            this.isLoading = false
            if (lastEvent !== e.eventName) {
                // suppress all repeating progress events and only show the first one
                lastEvent = e.eventName;
                if (e.eventName == 'complete') this.isLoading = false
            } else {
                this.isLoading = false
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

    extractImageName(fileUri) {
        var pattern = /[^/]*$/;
        var imageName = fileUri.match(pattern);
        return imageName;
    }

}
import { Component, OnInit, Output, EventEmitter, Input,} from '@angular/core';
import * as imagepicker from "nativescript-imagepicker";
import * as bgHttp from "nativescript-background-http";
import { isIOS } from "platform";
import { ObservableArray } from "data/observable-array";


import { localize } from "nativescript-localize";
import { BackendService } from "../../shared/backend.service";
import { ProfileService } from "../profile.service"
import { alert, confirm, getIconSource } from "../../shared/utils";
import { Profile } from "../../user/profile.model";


import {ImageSource, fromFile,fromNativeSource, fromResource, fromBase64} from "tns-core-modules/image-source";
import * as fs from "file-system";
import { tap } from 'rxjs/operators';

@Component({
    selector: 'ns-media',
    templateUrl: './media.component.html',
    styleUrls: ['./media.component.scss'],
    moduleId: module.id,
})
export class MediaComponent implements OnInit {
    @Input() profile;
    @Output() refreshProfile = new EventEmitter<string>();
    imageAssets = [];
    imageSrc: any;
    image_base64: any;
    isSingleMode: boolean = false;
    thumbSize: number = 80;
    previewSize: number = 300;
    getIconSource = getIconSource;
    public tasks: bgHttp.Task[] = [];
    public events: { eventTitle: string, eventData: any }[] = [];
    private file: string;
    private url: string;
    private counter: number = 0;
    private session: any;
    private images:any = [];
    public isLoading:boolean = false;

    constructor( private profileService: ProfileService ) {
        this.url = BackendService.baseUrl + "beez/loool_talent_images/upload_image_multipart";
        this.session = bgHttp.session("image-upload");
        this.loadImages();
        
    }
    ngOnInit() {}
    ngChange() {console.log('change',this.images); }
    loadImages() {
        this.profileService.getImages()
        .subscribe((result) => {
            this.images = result;
            console.log('reeeeesults',this.images);
        });
    }
    deleteImage(image){
        if(!this.isLoading){
            if(!image.fid){
                this.refreshProfile.emit()
                this.loadImages(); 
            }else{
                if(image.polaroid) {
                    confirm("DELETE?").then(result => {
                        if(result){
                            this.profileService.deleteImage(image.fid).subscribe( data => {
                                this.loadImages()
                                this.refreshProfile.emit()
                            },error => {
                                alert(localize("ERROR_SERVICE_Elimina_foto"))
                            });
                        }
                    },
                    error => {}
                    );
        
                }else{           
                    confirm("DELETE?").then(result => {
                        console.log('image cancella', image)
                        if(result){
                            this.profileService.deleteImage(image.fid).subscribe(data => {
                                this.refreshProfile.emit();
                                this.loadImages(); 
                                //alert(localize("eliminata"));
                            },error => {
                                alert(localize("ERROR_SERVICE_Elimina_foto"))
                            });
                        }
                    },
                    error => {}
                    );
                }
            }
        }

    }
    setPolaroidImage(image){
        if(!this.isLoading){
            if(!image.fid){
                this.refreshProfile.emit()
                this.loadImages(); 
            }else{
                confirm("Set as cover image?").then(result => {
                    console.log('image appena inserita',image);
                    if(result){
                        this.profileService.setPolaroidImage(image.fid).subscribe(data => {
                            this.refreshProfile.emit()
                            //this.loadImages();
                            alert(localize("inserita"));
                        },error => {
                            alert(localize("ERROR_SERVICE_polaroid_inserita"))
                        });
                    }
                },
                error => {
                });
            }
        }
        
    }

    public onSelectMultipleTap() {
        if(this.images.length < 3){
            this.isSingleMode = false;
            let context = imagepicker.create({
                mode: "single"
            });
            this.startSelection(context);
        }else{
            alert(localize("Hai raggiunto il massimo di media caricabili."));
        }
    }

    private startSelection(context) {
        context
        .authorize()
        .then(() => {
            return context.present();
        }).then((selection) => {
            let counter = 0
            // carico tutte le immagini selezionate
            selection.forEach( (selected_item) => {
                let source = new ImageSource();
                source.fromAsset(selected_item).then((image) => {
                    let name = new Date().toISOString() +'__'+ counter + ".jpg"
                    let folder = fs.knownFolders.documents();
                    let path = fs.path.join(folder.path, name );
                    let saved = image.saveToFile(path, "jpg");
                    var localPath = path;
                    var task = this.start_upload(localPath);
                    this.images.push(({ thumb: localPath, filepath:localPath, uploadTask: 'task' }));
                })
            })

        })
    }



    start_upload(fileUri) {
        this.isLoading = true;
        const name = this.extractImageName(fileUri);
        let headers = [];
        headers["Content-Type"] = "application/octet-stream";
        headers["Accept"] = 'application/json';
        headers["observe"] = "response";
        headers["x-csrf-token"] = BackendService.XCSFRtoken;
        headers["Cookie"] = BackendService.session_name + "=" + BackendService.sessid;   
        const request = {
            url: this.url,
            method: "POST",
            headers: headers,
            androidAutoDeleteAfterUpload: false,
            androidNotificationTitle: 'BEEEZ',
        };
        let task: bgHttp.Task;
        let lastEvent = "";
        const params = [{ name: `${name}`, filename: `${fileUri}`, mimeType: 'image/jpeg'}];
        task = this.session.multipartUpload(params, request);
        function onEvent(e) {
            this.isLoading = false;
            console.log("received " + JSON.stringify(e.responseCode ) + " code");
            if (lastEvent !== e.eventName) {
                // suppress all repeating progress events and only show the first one
                lastEvent = e.eventName;
                if (e.eventName == 'complete'){
                    this.isLoading = false;  
                }
            } else {
                this.isLoading = false;
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
            })
        }
        task.on("progress", onEvent.bind(this));
        task.on("error", onEvent.bind(this));
        task.on("responded", onEvent.bind(this));
        task.on("complete", onEvent.bind(this));
        lastEvent = "";
        this.tasks.push(task);

    }
    completeHandler(e) {
        console.log("received " + JSON.stringify(e.responseCode ) + " code");
        var serverResponse = e.response;
        this.isLoading = true;
    }
    extractImageName(fileUri) {
        var pattern = /[^/]*$/;
        var imageName = fileUri.match(pattern);
        return imageName;
    }
}
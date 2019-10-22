import { Component, OnInit, Output, EventEmitter, Input,} from '@angular/core';
import * as imagepicker from "nativescript-imagepicker";
import * as bgHttp from "nativescript-background-http";
import { isIOS } from "platform";
import { ObservableArray } from "data/observable-array";
import * as fs from "file-system";
import {ImageSource, fromFile,fromNativeSource, fromResource, fromBase64} from "tns-core-modules/image-source";
import { localize } from "nativescript-localize";
import { BackendService } from "../../shared/backend.service";
import { ProfileService } from "../profile.service"
import { alert, confirm, getIconSource } from "../../shared/utils";
import { Profile } from "../../user/profile.model";



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

    ngOnInit() {
        console.log('PROOOOOOVA INITTTTT');
    }


    ngChange(){
        console.log('change',this.images); 
    }


    loadImages(){
        this.profileService.getImages().subscribe((result) => {
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
            // carico tutte le immagini selezionate
            selection.forEach( (selected_item) => {
                let source = new ImageSource();
                source.fromAsset(selected_item).then((image) => {

                    console.log('l☯☯☯l > MediaComponent > startSelection() > image:', image);
                    
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

                    localPath = localPath;
                    console.log('l☯☯☯l > MediaComponent > startSelection() > localpath:',localPath);

                    var task = this.start_upload("image_" + counter + ".jpg", localPath);
                    this.images.push(({ thumb: localPath, filepath:localPath, uploadTask: 'task' }));
                    counter++;
                })
            })

        })
    }

    start_upload(uri, fileUri) {
        this.isLoading = true;
        // console.log('uri ', uri)
        // console.log(fileUri)

        const name = this.extractImageName(fileUri);;
        const description = `${name} (${++this.counter})`;
        debugger;

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
        const params = [ { name: name, filename: fileUri } ];
        task = this.session.multipartUpload(params, request);

        function onEvent(e) {
            //console.log('l☯☯☯l > MediaComponent > start_upload() > onEvent()',e);
            this.isLoading = false;

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



    extractImageName(fileUri) {
        var pattern = /[^/]*$/;
        var imageName = fileUri.match(pattern);
        return imageName;
    }



}
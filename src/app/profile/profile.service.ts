import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { tap, retry } from "rxjs/operators";

import { Profile } from "../user/profile.model";
import { BackendService } from "../shared/backend.service";

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  constructor(private http: HttpClient) {
    // console.log('BackendService.UID ',BackendService.UID)
  }

  load() {
    return this.http.get(BackendService.baseUrl + 'beez/loool_talent_profile/'+ BackendService.UID, {
      headers: BackendService.getCommonHeaders()
    }).pipe(
        retry(3)
        );
  }

  edit(profile) {
      return this.http.put( BackendService.baseUrl + 'beez/loool_talent_profile/'+ BackendService.UID,
       profile,
      {
        headers: BackendService.getCommonHeaders()
      });
  }

    drupal_upload(filename,file){
        return this.http.post( BackendService.baseUrl + "beez/loool_talent_profile/media_images_upload",
            {
                "filename":filename,
                "file":file,
                'mimeType': 'image/jpeg',
                "uid":BackendService.UID
            } ,
            {
                headers: BackendService.getCommonHeaders()
            });
        }

  getImages() {
    return this.http.get(BackendService.baseUrl + 'beez/loool_talent_images/'+ BackendService.UID,
    {
      headers: BackendService.getCommonHeaders()
    }).pipe(
        retry(3)
        );
  }
  deleteImage(fid) {
    return this.http.post(BackendService.baseUrl + 'beez/loool_talent_images/deleteimage',
    {
      "uid": BackendService.UID,
      "fid": fid
    },
    {
      headers: BackendService.getCommonHeaders()
    })
  }
  setPolaroidImage(fid) {
    return this.http.post(BackendService.baseUrl + 'beez/loool_talent_images/setpolaroid',
    {
      "uid": BackendService.UID,
      "fid": fid
    },
    {
      headers: BackendService.getCommonHeaders()
    })
  }
}

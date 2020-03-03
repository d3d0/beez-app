import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { tap, retry } from "rxjs/operators";

import { Profile } from "../user/profile.model";
import { BackendService } from "../shared/backend.service";
import { device } from "tns-core-modules/platform";


@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  constructor(private http: HttpClient) {
    // console.log('BackendService.UID ',BackendService.UID);
  }

  setLanguage(lang,uid) { 
    // console.log('lang',lang);
    // console.log('uid',uid);
    return this.http.post(BackendService.baseUrl + 'beez/loool_talent_profile/setlanguage',
    {
      "uid": uid,
      "lang": lang
    },
    {
      headers: BackendService.getCommonHeaders()
    });
  }

  load() {
    return this.http.get(BackendService.baseUrl + 'beez/loool_talent_profile/'+ BackendService.UID, {
      headers: BackendService.getCommonHeaders()
    }).pipe(retry(3));
  }

  edit(profile_data) {
      let profile =  JSON.parse(JSON.stringify(profile_data));
      profile.ethnicity=[profile.ethnicity]
      profile.languages=[profile.languages]
      profile.agency=[profile.agency]
      profile.phone=[profile.phone]
      profile.website=[{url:profile.website}]
      return this.http.put( BackendService.baseUrl + 'beez/loool_talent_profile/'+ BackendService.UID,
       profile,
      {
        headers: BackendService.getCommonHeaders()
      });
  }

  // drupal_upload(filename,file){
  //     return this.http.post( BackendService.baseUrl + "beez/loool_talent_profile/media_images_upload",
  //         {
  //             "filename":filename,
  //             "file":file,
  //             'mimeType': 'image/jpeg',
  //             "uid":BackendService.UID
  //         } ,
  //         {
  //             headers: BackendService.getCommonHeaders()
  //         });
  // }

  getImages() {
    return this.http.get(BackendService.baseUrl + 'beez/loool_talent_images/'+ BackendService.UID,
    {
      headers: BackendService.getCommonHeaders()
    }).pipe(
        retry(3)
        );
  }
  getVideos() {
    return this.http.get(BackendService.baseUrl + 'beez/loool_talent_videos/'+ BackendService.UID,
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
    });
  }
  deleteVideo(fid) {
    return this.http.post(BackendService.baseUrl + 'beez/loool_talent_videos/deletevideo',
    {
      "uid": BackendService.UID,
      "fid": fid
    },
    {
      headers: BackendService.getCommonHeaders()
    });
  }
  
  setPolaroidImage(fid) {
    return this.http.post(BackendService.baseUrl + 'beez/loool_talent_images/setpolaroid',
    {
      "uid": BackendService.UID,
      "fid": fid
    },
    {
      headers: BackendService.getCommonHeaders()
    });
  }
}

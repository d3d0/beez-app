import { Injectable } from '@angular/core';

import { User } from "./user.model";
import { USER } from "./user.mocks";
import { Profile } from "./profile.model";
import { PROFILE } from "./profile.mocks";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  
  getUser() :User{
    return USER;
  }
  getProfile() :Profile{
    return PROFILE;
  }
}

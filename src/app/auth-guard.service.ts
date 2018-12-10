import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";

import { BackendService } from "./shared";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    console.log('AuthGuard#canActivate called');
    if (BackendService.isLoggedIn()) {
      return true;
    }
    else {
      this.router.navigate(["/user"]);
      return false;
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";

import { Casting } from "../casting.model";
import { CastingsService} from "../castings.service";

@Component({
  selector: 'ns-casting',
  templateUrl: './casting-detail.component.html',
  styleUrls: ['./casting-detail.component.css'],
  moduleId: module.id,
})

export class CastingDetailComponent implements OnInit {
  private _casting: Casting;

  constructor(private castingsService: CastingsService, private pageRoute: PageRoute, private routerExtensions: RouterExtensions) { }

  ngOnInit() {
    this.pageRoute.activatedRoute
    .pipe(switchMap((activatedRoute) => activatedRoute.params))
    .forEach((params) => {
      const castingId = params.id;
      this._casting = this.castingsService.getCarById(castingId);
    })
  }

    get casting() : Casting{
        return this._casting;
    }

    goBack(): void{
      // this.routerExtensions.backToPreviousPage();
      // this.routerExtensions.back();
      this.routerExtensions.navigate(["/home"])
      // this.routerExtensions.navigate(["/home"],
      // {
        //     animated: true,
        //     transition: {
          //         name: "slide",
          //         duration: 200,
          //         curve: "ease"
          //     }
          // });
        }

      }

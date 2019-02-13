import { Component, OnInit } from '@angular/core';
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { CastingsService} from "../castings.service";
import { Casting } from "../casting.model";

@Component({
  selector: 'ns-casting',
  templateUrl: './casting-detail.component.html',
  styleUrls: ['./casting-detail.component.css'],
  moduleId: module.id,
})

export class CastingDetailComponent implements OnInit {
  private _casting = {};
  private casting_id;

  constructor(
    private activeRoute: ActivatedRoute,
    private castingsService: CastingsService,
    private routerExtension: RouterExtensions) {
      this.activeRoute.params.subscribe((params) => {
        this.casting_id=params.id
      });
    }

  ngOnInit() {
    this.castingsService.load().subscribe(
      data => console.log(data) 
      )
  }

  get casting(){
    return this._casting
  }

  goBack(): void{
    this.routerExtension.back({ relativeTo: this.activeRoute });
  }

}

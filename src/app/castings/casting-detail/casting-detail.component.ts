import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  selector: 'ns-casting',
  templateUrl: './casting-detail.component.html',
  styleUrls: ['./casting-detail.component.css'],
  moduleId: module.id,
})
export class CastingDetailComponent implements OnInit {

  constructor(private routerExtensions: RouterExtensions) { }

  ngOnInit() {
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

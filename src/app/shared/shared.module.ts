import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule, NSEmptyOutletComponent } from "nativescript-angular/router";

import { CastingStatusPipe } from "../castings/castings-list/casting-status.pipe";
import { CastingDetailComponent } from '../castings/casting-detail/casting-detail.component';
import { SelectDateModalViewComponent } from "./select-date-modal-view/select-date-modal-view.component";
import { SelectModalViewComponent } from "./select-modal-view/select-modal-view.component";
import { BeezFloatLabelSelect } from './beez-float-label-select/beez-float-label-select.component'
import { BeezFloatLabelTextfield } from './beez-float-label-textfield/beez-float-label-textfield.component'
import { BeezButton } from './beez-button/beez-button.component'

const sharedRoutes: Routes = [
    { path: "modal-date-view", component: SelectDateModalViewComponent },
    { path: "modal-view", component: SelectModalViewComponent }
];

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptLocalizeModule,
    NativeScriptRouterModule.forChild(sharedRoutes),
    NativeScriptFormsModule
  ],
  declarations: [
    CastingDetailComponent,
    CastingStatusPipe,
    BeezFloatLabelSelect,
    BeezFloatLabelTextfield,
    BeezButton,
    SelectDateModalViewComponent,
    SelectModalViewComponent
    ],
  exports: [
    NativeScriptRouterModule,
    CastingStatusPipe,
    BeezFloatLabelSelect,
    BeezFloatLabelTextfield,
    BeezButton,
    CastingDetailComponent,
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptLocalizeModule
  ]
})
export class SharedModule { }
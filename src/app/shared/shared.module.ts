 import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule, NSEmptyOutletComponent } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms"

import { CastingStatusPipe } from "../castings/castings-list/casting-status.pipe";
import { TaxonomyVocabolaryPipe } from "./taxonomy-vocabolary.pipe";
import { CastingDetailComponent } from '../castings/casting-detail/casting-detail.component';
import { SelectDateModalViewComponent } from "../components/select-date-modal-view/select-date-modal-view.component";
import { SelectModalViewComponent } from "../components/select-modal-view/select-modal-view.component";
import { BeezFloatLabelSelect } from '../components/beez-float-label-select/beez-float-label-select.component'
import { BeezFloatLabelTextfield } from '../components/beez-float-label-textfield/beez-float-label-textfield.component'
import { BeezInlineSelect } from '../components/beez-inline-select/beez-inline-select.component'
import { BeezInlineTextfield } from '../components/beez-inline-textfield/beez-inline-textfield.component'
import { BeezButton } from '../components/beez-button/beez-button.component'

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
    TaxonomyVocabolaryPipe,
    CastingStatusPipe,
    BeezFloatLabelSelect,
    BeezFloatLabelTextfield,
    BeezInlineSelect,
    BeezInlineTextfield,
    BeezButton,
    SelectDateModalViewComponent,
    SelectModalViewComponent
    ],
  exports: [
    NativeScriptRouterModule,
    CastingStatusPipe,
    BeezFloatLabelSelect,
    BeezFloatLabelTextfield,
    BeezInlineSelect,
    BeezInlineTextfield,
    BeezButton,
    TaxonomyVocabolaryPipe,
    CastingDetailComponent,
    NativeScriptCommonModule,
    NativeScriptLocalizeModule
  ]
})
export class SharedModule { }

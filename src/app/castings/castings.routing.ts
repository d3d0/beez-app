import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../shared/auth-guard.service";


import { CastingsComponent } from "./castings.component";
import { CastingComponent } from "./casting/casting.component";

const CastingsRoutes: Routes = [
    { path: "castings", component: CastingsComponent, canActivate: [AuthGuard] }
];

export const CastingRouting: ModuleWithProviders = RouterModule.forChild(CastingsRoutes);

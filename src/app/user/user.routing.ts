import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login/login.component";

const userRoutes: Routes = [
  { path: "login", component: LoginComponent },
];
export const userRouting: ModuleWithProviders = RouterModule.forChild(userRoutes);
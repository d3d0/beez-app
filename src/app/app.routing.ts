import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { AuthGuard } from "./auth-guard.service";

import { HomeComponent } from "./home/home.component";

export const authProviders = [
  AuthGuard
];

const routes: Routes = [
	{ path: '', redirectTo: "/home", pathMatch: 'full' },
  { path: "user", loadChildren: "~/app/user/user.module#UserModule"},
	{ path: 'home',component: HomeComponent, canActivate: [AuthGuard], children: [
		{ path: "castings", loadChildren: "~/app/castings/castings.module#CastingsModule", outlet: "castingsTab"},
		{ path: "notifications", loadChildren: "~/app/notifications/notifications.module#NotificationsModule", outlet: "notificationsTab"},
		{ path: "profile", loadChildren: "~/app/profile/profile.module#ProfileModule", outlet: "profileTab"}, 
  ]}
];


// const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   //{ path: '', redirectTo: '/tabs/(playerTab:players//teamTab:teams)', pathMatch: 'full' },

//   { path: 'tabs', component: TabsComponent, children: [
//     { path: 'players', component: PlayerComponent, outlet: 'playerTab'  },
//     { path: 'player/:id', component: PlayerDetailComponent, outlet: 'playerTab'  },
  
//     { path: 'teams', component: TeamsComponent, outlet: 'teamTab' },
//     { path: 'team/:id', component: TeamDetailComponent, outlet: 'teamTab' },
// ];




@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    // imports: [NativeScriptRouterModule.forRoot(routes, { enableTracing: true })],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
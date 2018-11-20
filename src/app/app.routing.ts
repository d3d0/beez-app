import { AuthGuard } from "./shared/auth-guard.service";

export const authProviders = [
  AuthGuard
];

export const appRoutes = [
    { path: "", redirectTo: "castings", pathMatch: "full" },
    // { path: "login", loadChildren: "~/app/login/login.module#LoginComponent" },
    // { path: "castings", loadChildren: "~/app/castings/castings.module#CastingsModule" , outlet: "castingsTab" },
    // { path: "castings", loadChildren: "~/app/castings/castings.module#CastingsModule" , outlet: "castingsTab" },
    { path: "castings", loadChildren: "~/app/castings/castings.module#CastingsModule" , outlet: "castingsTab" },
    { path: "notifications", loadChildren: "~/app/notifications/notifications.module#NotificationsModule" , outlet: "notificationsTab" }
		// { path: "notifications", component: NotificationsComponent, outlet: "notificationsTab" },
    // { path: "profile", component: ProfileComponent, outlet: "profileTab" }
];

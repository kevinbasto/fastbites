import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "auth",
        pathMatch: "full"
    },
    {
        path: "auth",
        loadChildren: () => import("./layouts/auth/auth.module").then(m => m.AuthModule)
    },
    {
        path: "client",
        loadChildren: () => import("./layouts/client/client.module").then(m => m.ClientModule)
    }
];

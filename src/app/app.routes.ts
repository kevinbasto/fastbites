import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { nonAuthGuard } from './core/guards/non-auth/non-auth.guard';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "client",
        pathMatch: "full"
    },
    {
        path: "client",
        loadChildren: () => import("./layouts/client-layout/client-layout.module").then(m => m.ClientLayoutModule),
        canActivate: [authGuard]
    },
    {
        path: "auth",
        loadChildren: () => import("./layouts/auth-layout/auth-layout.module").then(m => m.AuthLayoutModule),
        canActivateChild: [nonAuthGuard]
    },
    {
        path: "public",
        loadChildren: () => import("./pages/public/public.module").then(m => m.PublicModule)
    }
];

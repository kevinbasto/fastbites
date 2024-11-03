import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientLayoutRoutingModule } from './client-layout-routing.module';
import { ClientLayoutComponent } from './client-layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from "@angular/material/divider";

@NgModule({
  declarations: [
    ClientLayoutComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    ClientLayoutRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ]
})
export class ClientLayoutModule { }

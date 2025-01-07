import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LandingComponent } from './landing.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class LandingModule { }

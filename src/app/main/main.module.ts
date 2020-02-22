import { SidenavMenuPageModule } from './sidenav-menu/sidenav-menu.module';
import { HeaderPageModule } from './header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import { WallPageModule } from './wall/wall.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    WallPageModule,
    MatSidenavModule,
    HeaderPageModule,
    SidenavMenuPageModule
  ],
  declarations: [
    MainPage
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [
    MainPage
  ]
})
export class MainPageModule { }

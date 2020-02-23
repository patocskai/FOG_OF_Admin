import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatInputModule, MatFormFieldModule, MatFormFieldControl } from '@angular/material';
import { HeaderPageModule } from '../header/header.module';
import { SidenavMenuPageModule } from '../sidenav-menu/sidenav-menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    MatSidenavModule,
    HeaderPageModule,
    SidenavMenuPageModule,
    MatInputModule,
    MatFormFieldModule
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

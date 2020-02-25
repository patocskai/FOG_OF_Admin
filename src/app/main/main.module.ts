import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MainPage } from './main.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatInputModule, MatFormFieldModule, MatFormFieldControl } from '@angular/material';
import { HeaderPageModule } from '../header/header.module';
import { SidenavMenuPageModule } from '../sidenav-menu/sidenav-menu.module';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { WallPageModule } from '../wall/wall.module';

const routes: Routes = [
  { path: 'main', redirectTo: 'main/wall', pathMatch: 'full' },
  {
    path: 'main',
    component: MainPage,
    children: [
      {
        path: 'wall', loadChildren: './../wall/wall.module#WallPageModule'
      },
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    IonicModule,
    MatSidenavModule,
    HeaderPageModule,
    SidenavMenuPageModule,
    MatInputModule,
    MatFormFieldModule,
    WallPageModule
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

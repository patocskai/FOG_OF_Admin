import { NewsDialogComponent } from './news-dialog/news-dialog.component';
import { SidenavMenuComponent } from './sidenav-menu/sidenav-menu.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    HeaderComponent,
    SidenavMenuComponent,
    NewsDialogComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ShareModule { }

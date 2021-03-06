import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { IonicModule } from '@ionic/angular';
import { MatIconModule } from '@angular/material/icon';
import { NewsDialogComponent } from './news-dialog/news-dialog.component';
import { SidenavMenuComponent } from './sidenav-menu/sidenav-menu.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatBadgeModule, MatBottomSheetModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatChipsModule } from '@angular/material';



@NgModule({
  declarations: [
    HeaderComponent,
    SidenavMenuComponent,
    NewsDialogComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MatIconModule,
    MatToolbarModule,
    MatBadgeModule,
    MatListModule,
    MatCardModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatButtonModule,
    RouterModule,
    MatFormFieldModule,
    MatChipsModule
  ],
  exports: [
    HeaderComponent,
    SidenavMenuComponent,
    NewsDialogComponent
  ],
  entryComponents: [
    NewsDialogComponent
  ]
})
export class ShareModule { }

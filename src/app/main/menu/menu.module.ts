import { AuthGuard } from './../../core/auth.guard';
import { DataResolverService } from './../../services/data-resolver.service';
import { ShareModule } from './../../shared/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';
import { ExaminationPage } from '../examination/examination.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'work-group',
        loadChildren:
          'src/app/main/work-group/work-group.module#WorkGroupPageModule', canActivate: [AuthGuard]
      },
      {
        path: 'actual/:id',
        resolve: {
          special: DataResolverService
        },
        loadChildren: 'src/app/main/actual/actual.module#ActualPageModule', canActivate: [AuthGuard]
      },
      {
        path: 'wall',
        loadChildren: 'src/app/main/wall/wall.module#WallPageModule', canActivate: [AuthGuard]
      },
      {
        path: 'examination',
        loadChildren:
          'src/app/main/examination/examination.module#ExaminationPageModule', canActivate: [AuthGuard]
      },
      {
        path: 'group-statistics',
        loadChildren:
          'src/app/main/group-statistics/group-statistics.module#GroupStatisticsPageModule', canActivate: [AuthGuard]
      },
      {
        path: 'staff',
        loadChildren: 'src/app/main/staff/staff.module#StaffPageModule', canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        loadChildren: 'src/app/main/profile/profile.module#ProfilePageModule', canActivate: [AuthGuard]
      },
      {
        path: 'histological',
        loadChildren:
          'src/app/main/examination/examination.module#ExaminationPageModule', canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: '/menu/work-group'
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ShareModule
  ],
  declarations: [
    MenuPage
  ],
})
export class MenuPageModule {}

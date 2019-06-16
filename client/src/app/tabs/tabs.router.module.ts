import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { OverviewPage } from '../overview/overview.page';
import { OverviewPageModule } from '../overview/overview.module';
import { SettingsPageModule } from '../settings/settings.module';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'overview',
        children: [
          {
            path: '',
            loadChildren: '../overview/overview.module#OverviewPageModule'
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: '../settings/settings.module#SettingsPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/overview',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/overview',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

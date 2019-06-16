import { NgModule, Injectable } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { constructor } from 'q';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: "root"
})
class CanActivateApp implements CanActivate {

  constructor(
    private router: Router,
    private settingsService: SettingsService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {

    if(this.settingsService.areSettingsValid)
      return true;

    this.router.navigate(["settings"]);
    return false;
  }

}

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [CanActivateApp] },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {

  }
}

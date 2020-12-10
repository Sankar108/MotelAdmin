import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
    data: { navVisible: false }
  },
  {
    path: '',
    loadChildren: () => import('./pages/layout/layout.module').then(m => m.LayoutModule),
    data: { navVisible: true }
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule],
  providers:[Location, {provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRoutingModule { }

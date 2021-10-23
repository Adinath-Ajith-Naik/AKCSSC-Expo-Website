import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
      { path: 'vote', loadChildren: () => import('./pages/vote/vote.module').then(m => m.VoteModule) },
      { path: 'admin-panel', loadChildren: () => import('./pages/admin-panel/admin-panel.module').then(m => m.AdminPanelModule) },
      { path: 'sign-in', loadChildren: () => import('./pages/signin/signin.module').then(m => m.SigninModule) },

    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: false, preloadingStrategy: PreloadAllModules })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

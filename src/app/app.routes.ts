import { Routes } from '@angular/router';
import { HomeprovideComponent } from './homeprovide/homeprovide.component';
import { ImprintComponent } from './pages/imprint/imprint.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeprovideComponent },

  { path: 'imprint', component: ImprintComponent },
  { path: '**', redirectTo: 'fakePage', pathMatch: 'full' },

  { path: 'fakePage', component: NotFoundComponent },
];

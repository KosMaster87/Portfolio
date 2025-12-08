/**
 * @fileoverview Application routes.
 * @description Defines the routing configuration for the Angular application.
 * @module app/routes
 */

import { Routes } from '@angular/router';

import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { ImprintPageComponent } from './features/legal/pages/imprint-page/imprint-page.component';
import { PrivacyPolicyPageComponent } from './features/legal/pages/privacy-policy-page/privacy-policy-page.component';
import { SourcesPageComponent } from './features/legal/pages/sources-page/sources-page.component';
import { NotFoundPageComponent } from './shared/pages/not-found-page/not-found-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'imprint', component: ImprintPageComponent },
  { path: 'privacy-policy', component: PrivacyPolicyPageComponent },
  { path: 'sources', component: SourcesPageComponent },
  { path: '**', component: NotFoundPageComponent },
];

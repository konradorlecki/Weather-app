import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './pages/home/home.component';
import { HomeModule } from './home.module';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

export const routing: ModuleWithProviders<HomeModule> = RouterModule.forChild(routes);

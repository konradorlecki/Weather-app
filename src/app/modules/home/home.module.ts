import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgmCoreModule } from '@agm/core';

import { HomeComponent } from './pages/home/home.component';
import { environment } from '../../../environments/environment';
import { routing } from './home-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    routing,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey
    }),
  ]
})
export class HomeModule { }

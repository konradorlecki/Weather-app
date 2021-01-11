import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgmCoreModule } from '@agm/core';

import { HomeComponent } from './pages/home/home.component';
import { environment } from '../../../environments/environment';
import { routing } from './home-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    routing,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey,
      libraries: ['places']
    }),
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule {
}

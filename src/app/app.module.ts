import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfileService } from './profile.service';
import { SwitchComponentComponent } from './switch-component/switch-component.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileSettingsComponent,
    SwitchComponentComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }

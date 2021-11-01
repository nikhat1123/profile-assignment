import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { ProfileService } from './services/profile.service';
import { SwitchComponentComponent } from './components/switch-component/switch-component.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileSettingsComponent,
    SwitchComponentComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }

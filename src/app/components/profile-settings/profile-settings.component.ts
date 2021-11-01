import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProfile, ProfileService } from '../../services/profile.service';

export interface Error {
  error: string;
}

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html'
})
export class ProfileSettingsComponent implements OnInit {

  errorMessage: string;
  loading: boolean;
  saving: boolean;
  showError: boolean;
  userInfo: IProfile;
  userInfoForm: FormGroup;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.loading = true;
    this.createForm();
    this.fetchData();
  }

  private fetchData(): void {
    this.profileService.getProfileUser().then(
      (data) => {
        this.userInfo = data;
        this.addFormValues();
        this.loading = false;
      },
      (err) => {
        this.fetchData();
      }
    );
  }

  private createForm(): void {
    this.userInfoForm = new FormGroup({
      firstName: new FormControl({ value: '', disabled: true }, Validators.required),
      lastName: new FormControl({ value: '', disabled: true }, Validators.required),
    });
  }

  private addFormValues() {
    this.userInfoForm.get('firstName').setValue(this.userInfo.firstName);
    this.userInfoForm.get('lastName').setValue(this.userInfo.lastName);
    this.enableFormFields();
  }

  private setErrorMessage(err: Error) {
    this.showError = true;
    this.errorMessage = err.error;
  }

  private enableFormFields() {
    this.userInfoForm.get('firstName').enable();
    this.userInfoForm.get('lastName').enable();
  }

  private disableFormFields() {
    this.userInfoForm.get('firstName').disable();
    this.userInfoForm.get('lastName').disable();
  }

  callSetName() {
    this.saving = true;
    this.showError = false;
    this.disableFormFields();
    this.profileService.setName(this.userInfoForm.get('firstName').value, this.userInfoForm.get('lastName').value).then(
      (value) => {
        this.profileService.setUserEmail().then(
          (savedData) => this.userInfo = savedData,
          (err) => {
            this.setErrorMessage(err);
          }
        )

      },
      (err) => {
        this.setErrorMessage(err);
      }
    ).finally(
      () => {
        this.saving = false;
        this.enableFormFields();
      }
    );
  }
}

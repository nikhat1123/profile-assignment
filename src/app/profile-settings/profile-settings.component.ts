import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProfile, ProfileService } from '../profile.service';

export interface Error {
  error: string;
}

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  userInfo: IProfile;
  userInfoForm: FormGroup;
  email: string;
  loading: boolean;
  saving: boolean;
  showError: boolean;
  errorMessage: string;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.loading = true;
    this.createForm();
    this.fetchData();
  }

  fetchData(): void {
    this.profileService.getProfileUser().then(
      (data) => {
        this.userInfo = data;
        this.addFormValues();
        this.loading = false;
      },
      (err) => {
        console.log('error');
        this.fetchData();
      }
    );
  }

  createForm(): void {
    this.userInfoForm = new FormGroup({
      firstName: new FormControl({ value: '', disabled: true }, Validators.required),
      lastName: new FormControl({ value: '', disabled: true }, Validators.required),
    });
  }

  addFormValues() {
    this.userInfoForm.get('firstName').setValue(this.userInfo.firstName);
    this.userInfoForm.get('lastName').setValue(this.userInfo.lastName);
    this.enableFormFields();
    console.log(this.userInfoForm);
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

  setErrorMessage(err: Error) {
    this.showError = true;
    this.errorMessage = err.error;
  }

  enableFormFields() {
    this.userInfoForm.get('firstName').enable();
    this.userInfoForm.get('lastName').enable();
  }

  disableFormFields() {
    this.userInfoForm.get('firstName').disable();
    this.userInfoForm.get('lastName').disable();
  }
}

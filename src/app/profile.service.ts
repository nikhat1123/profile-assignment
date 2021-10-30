import { Injectable } from '@angular/core';
import { rejects } from 'assert';

export interface IProfile {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  age: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  user: IProfile;

  constructor() { }

  getProfileUser(): Promise<IProfile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user = {
            firstName: 'Michael',
            lastName: 'Collins',
            username: 'michael.collins',
            email: 'michael.collins@blueface.com',
            age: 30
          };
          resolve(this.user);
        } else {
          reject({ error: 'Profile not found' });
        }
      }, Math.random() * 5000);
    });
  }


  setName(firstName: string, lastName: string): Promise<IProfile> {
    console.log('came here');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user.firstName = firstName;
          this.user.lastName = lastName;
          resolve(this.user);
        } else {
          reject({ error: 'Invalid name' });
        }
      }, Math.random() * 5000);
    });
  }

  setUserEmail() : Promise<IProfile>{
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user.email = this.user.firstName.trim() + '.' + this.user.lastName.trim() + '@blueface.com';
          resolve(this.user);
        } else {
          reject({ error: 'Error on email generation!' });
        }
      }, Math.random() * 5000);
    });
  }
}

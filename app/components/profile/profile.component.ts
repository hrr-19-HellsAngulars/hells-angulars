import { Component, OnInit } from '@angular/core';

import { ProfileService } from './profile.service';

@Component({
  moduleId: module.id,
  selector: 'profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})

export class ProfileComponent implements OnInit {
  user: Array<any>;

  constructor(
    private profileService: ProfileService
  ) { }

  getUserInfo() {
    this.profileService
      .getUserInfo()
      .then(info => {
        // do something with the info returned from request
        this.user = info;
        console.log(this.user)
      })
  }

  ngOnInit(): void {
    this.getUserInfo();
  }
}
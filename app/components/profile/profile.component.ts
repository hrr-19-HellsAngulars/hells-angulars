import { Component, OnInit } from '@angular/core';

import { ProfileService } from './profile.service';

@Component({
  moduleId: module.id,
  selector: 'profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})

export class ProfileComponent implements OnInit {

  constructor(
    private profileService: ProfileService
  ) { }

  getUserInfo() {
    this.profileService
      .getUserInfo()
      .then(info => {
        // do something with the info returned from request
        console.log(info)
      })
  }

  ngOnInit(): void {
    this.getUserInfo();
  }
}
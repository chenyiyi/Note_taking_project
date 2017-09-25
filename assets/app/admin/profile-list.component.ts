import { Component, OnInit } from "@angular/core";

import { Profile } from "./profile.model";
import { ProfileService } from "./profile.service";

@Component({
    selector: 'app-profile-list',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <app-profile
                   [profile]="profile"
                    *ngFor="let profile of profiles"></app-profile>
        </div>
    `
})
export class ProfileListComponent implements OnInit {
    profiles: Profile[];

    constructor(private profileService: ProfileService) {}

    ngOnInit() {
        this.profileService.getProfiles()
            .subscribe(
                (profiles: Profile[]) => {
                    this.profiles = profiles;
                }
            );
    }
}
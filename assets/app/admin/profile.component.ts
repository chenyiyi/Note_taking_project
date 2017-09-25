import { Component, Input } from "@angular/core";

import { Profile } from "./profile.model";
import { ProfileService } from "./profile.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styles: [`
        .profile {
            border-style: solid;
            }
        .author {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%;
        }
        .config {
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 19%;
        }
        .btn-danger {
            color: #fff;
            background-color: #d9534f;
            border-color: #d43f3a;
        }
    `]
})
export class ProfileComponent {
    @Input() profile: Profile;

    constructor(private profileService: ProfileService) {}

    //edit part
    firstNameEdit() {
        this.profileService.editProfile(this.profile, "firstName", this.profile['firstName']);
    }
    lastNameEdit() {
        this.profileService.editProfile(this.profile, "lastName", this.profile['lastName']);
    }
    emailEdit() {
        this.profileService.editProfile(this.profile, "email", this.profile['email']);
    }
    passwordEdit() {
        this.profileService.editProfile(this.profile, "password", this.profile['password']);
    }

    onDelete() {
        this.profileService.deleteProfile(this.profile)
            .subscribe(
                result => console.log(result)
            );
    }

    belongsToUser() {
        return localStorage.getItem('userId') == this.profile.userId;
    }
}
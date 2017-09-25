import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { ProfileService } from "./profile.service";
import { Profile } from "./profile.model";

@Component({
    selector: 'app-profile-modify',
    templateUrl: './profile-modify.component.html'
})
export class ProfileModifyComponent implements OnInit {
    profile: Profile;
    field: string;
    modifyContent: string;

    constructor(private profileService: ProfileService) {}

    onSubmit(form: NgForm) {
        if (this.profile) {
            // Edit
            //this.field refer to the message in profile we want to change
            this.profile[this.field] = form.value.content;
            this.profileService.updateProfile(this.profile, this.field, this.modifyContent)
                .subscribe(
                    result => console.log(result)
                );
            this.profile = null;
        } else {
            // Create
            /*
            const profile = new Profile(form.value.lastName, 'Max', 'haha@gmail.com', '1234');
            this.profileService.addProfile(profile)
                .subscribe(
                    data => console.log(data),
                );
                */
            console.log("Not add at this time!")
        }
        form.resetForm();
    }

    onClear(form: NgForm) {
        this.profile = null;
        form.resetForm();
    }

    ngOnInit() {
        this.profileService.profileIsEdit.subscribe(
            (profile: Profile) => this.profile = profile
        );
        this.profileService.profileEditField.subscribe(
            (field: string) => this.field = field
        )
        this.profileService.profileEditContent.subscribe(
            (modifyContent: string) => this.modifyContent = modifyContent
        )
    }
}
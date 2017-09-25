import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfilesComponent } from "./profiles.component";
import { ProfileListComponent } from "./profile-list.component";
import { ProfileComponent } from "./profile.component";
import { ProfileModifyComponent } from "./profile-modify.component";
import { ProfileService } from "./profile.service";

@NgModule({
    declarations: [
        ProfilesComponent,
        ProfileListComponent,
        ProfileComponent,
        ProfileModifyComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    providers: [ProfileService]
})
export class ProfileModule {

}
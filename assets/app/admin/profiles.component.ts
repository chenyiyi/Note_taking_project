import { Component } from "@angular/core";

@Component({
    selector: 'app-profiles',
    template: `
        <div class="row">
            <app-profile-modify></app-profile-modify>
        </div>
        <hr>
        <div class="row">
            <app-profile-list></app-profile-list>
        </div>
    `
})
export class ProfilesComponent {

}
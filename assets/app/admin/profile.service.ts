import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Profile } from "./profile.model";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class ProfileService {
    private profiles: Profile[] = [];
    profileIsEdit = new EventEmitter<Profile>();
    profileEditField = new EventEmitter<string>();
    profileEditContent = new EventEmitter<string>();

    constructor(private http: Http, private errorService: ErrorService) {
    }

    getProfiles() {
        return this.http.get('http://localhost:3000/profile')
            .map((response: Response) => {
                const profiles = response.json().obj;
                let transformedProfiles: Profile[] = [];
                for (let profile of profiles) {
                    transformedProfiles.push(new Profile(
                        profile.lastName,
                        profile.firstName,
                        profile.email,
                        profile.password,
                        profile._id)
                    );
                }
                this.profiles = transformedProfiles;
                return transformedProfiles;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    editProfile(profile: Profile, field: string, modifyContent: string) {
        this.profileEditField.emit(field);
        this.profileEditContent.emit(modifyContent);
        this.profileIsEdit.emit(profile);
    }

    updateProfile(profile: Profile, field : string, content : string) {
        const changeContent = profile[field];
        const info = {field : field, content: changeContent};
        const body = JSON.stringify(info);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch('http://localhost:3000/profile/' + profile.userId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    //used to delete user
    deleteProfile(profile: Profile) {
        this.profiles.splice(this.profiles.indexOf(profile), 1);
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete('http://localhost:3000/profile/' + profile.userId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}
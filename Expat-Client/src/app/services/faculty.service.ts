import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class FacultyService extends BaseService {

    constructor(private http: HttpClient, private userService: UserService) {
        super();
    }

    async getStudents(): Promise<any> {
        var wallet = await this.userService.getConnectedWallet();
        return this.http.get(`${this.apiBaseUrl}/users/students?metamaskAddress=${wallet.address}`).toPromise();
    }

    async getFaculty(): Promise<any> {
        return this.http.get(`${this.apiBaseUrl}/users/faculty`).toPromise();
    }

}


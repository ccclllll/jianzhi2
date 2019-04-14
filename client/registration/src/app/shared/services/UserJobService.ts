import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UrlConfig } from './url.config';
import {Job} from "../domain/Job";
import {UserJob} from "../domain/UserJob";
const BASEURL = UrlConfig.BASEURL;

@Injectable()
export class UserJobService {
    constructor(private http: HttpClient) {
    }

    useJob(userJobId: number): Observable<UserJob>{
        return this.http.get<UserJob>(`${BASEURL}/api/userjobs/${userJobId}`);
    }
    useJobs(userId: number): Observable<Job[]>{
        return this.http.get<Job[]>(`${BASEURL}/api/userjobs?userId=${userId}`);
    }
    jobUsers(jobId: number): Observable<Job[]>{
        return this.http.get<Job[]>(`${BASEURL}/api/jobusers?jobId=${jobId}`);
    }

    saveUserJob(userJob: UserJob): Observable<UserJob>{

        return this.http.post<UserJob>(`${BASEURL}/api/userjob`, userJob);
    }



}
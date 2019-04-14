import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UrlConfig } from './url.config';
import {Job} from "../domain/Job";
import {Score} from "../domain/score";
const BASEURL = UrlConfig.BASEURL;

@Injectable()
export class ScoreService {
    constructor(private http: HttpClient) {

    }
    savaScore(score): Observable<Score> {
        return this.http.post<Score>(`${BASEURL}/api/score`, score);
    }
}

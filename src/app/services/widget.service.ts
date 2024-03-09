import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Feedback } from "../models/Feedback.model";

@Injectable()
export class WidgetService {

    private api: string = 'https://localhost:7000/api/v1/feedback';
    private http = inject(HttpClient);

    constructor() {}

    get(id: string): Observable<any> {
        return this.http.get(this.api + '/' + id);
    }

    post(feedback: Feedback): Observable<any> {
        return this.http.post(this.api + '/', feedback);
    }

}
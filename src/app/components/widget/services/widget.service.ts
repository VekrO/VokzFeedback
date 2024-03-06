import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Feedback } from "../../models/Feedback.model";

@Injectable()
export class WidgetService {

    private api: string = 'https://localhost:7000/api/v1/feedback';

    constructor(private http: HttpClient) {}

    get(id: string): Observable<any> {
        return this.http.get(this.api + '/' + id);
    }

    post(feedback: Feedback): Observable<any> {
        return this.http.post(this.api + '/', feedback);
    }

}
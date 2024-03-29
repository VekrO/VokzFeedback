import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { APP } from "../../environments/environment";
import { Feedback } from "../models/Feedback.model";

@Injectable()
export class FeedbackService {
    
    private api: string = APP.api + '/feedback';
    private http: HttpClient = inject(HttpClient);

    get(id: string, idUsuario: string): Observable<Feedback[]> {
        return this.http.get<Feedback[]>(this.api + '/usuario/' + idUsuario + '/id/' + id);
    }

    getByStatus(idUsuario: string, status: string): Observable<Feedback[]> {
        return this.http.get<Feedback[]>(this.api + '/usuario/' + idUsuario + '/status/' + status);
    }

    post(feedback: Feedback): Observable<Feedback> {
        return this.http.post<Feedback>(this.api + '/', feedback);
    }

    delete(id: string): Observable<any> {
        return this.http.delete(this.api + '/' + id);
    }

}
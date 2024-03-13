import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class ModalConfigRef {

    private _destroy: Subject<Object> = new Subject();
    public onDestroy: Observable<Object> = this._destroy.asObservable();

    destroy(status: {} = {}): void {
        this._destroy.next(status);
    } 

}
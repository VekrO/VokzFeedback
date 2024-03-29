import { Injectable } from "@angular/core";
import moment from "moment";

@Injectable()
export class MomentService {

    getDate(): string {
        return moment(new Date()).local().format();
    }

}
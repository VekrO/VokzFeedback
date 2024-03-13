import { Injectable } from "@angular/core";

@Injectable()
export class UtilService {
    
    isMobile() {
        return window.innerWidth < 768;
    }

    isTablet() {
        return window.innerWidth < 1200 && window.innerWidth > 768;
    }

    getModalWidth() {
        return this.isMobile() ? '95%' : this.isTablet() ? '85%' : '50%';
    }

}
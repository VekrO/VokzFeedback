import { Component, inject } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { ModalConfigRef } from "../../services/modalConfigRef.service";

@Component({
    selector: 'app-confirmation',
    standalone: true,
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.scss'],
    imports: [
        ButtonModule,
        RippleModule
    ]
})
export class ConfirmationComponent {

    private dynamicDialog: ModalConfigRef = inject(ModalConfigRef);

    constructor() {}

    confirm() {
        this.dynamicDialog.destroy({status: 'SIM'});
    }

    decline() {
        this.dynamicDialog.destroy({status: 'NÃO'});
    }
    
}
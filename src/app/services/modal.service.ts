import { ApplicationRef, ComponentRef, EnvironmentInjector, Injectable, Type, createComponent, inject } from "@angular/core";
import { Observable, Subject, takeUntil } from "rxjs";
import { ModalComponent } from "../components/modal/modal.component";
import { ModalConfigRef } from "./modalConfigRef.service";

@Injectable()
export class ModalService {

    private injector: EnvironmentInjector = inject(EnvironmentInjector);
    private dialogComponentRef!: ComponentRef<any>;
    private dialogMainRef!: ComponentRef<any>;
    private appRef: ApplicationRef = inject(ApplicationRef);
    private modalConfigRef: ModalConfigRef = inject(ModalConfigRef);
    private unsub$: Subject<void> = new Subject();
    private notifier$!: Subject<Object>;

    constructor() {}

    open(component: Type<any>, options: { data?: {}, title?: string, message?: string, width?: string, height?: string }): Observable<any> {

        this.dialogComponentRef = createComponent(component, {
            environmentInjector: this.injector
        });

        this.dialogMainRef = createComponent(ModalComponent, {
            environmentInjector: this.injector,
            hostElement: document.querySelector('.modal-container')!,
            projectableNodes: [
                [this.dialogComponentRef.location.nativeElement]
            ]
        });

        this.dialogMainRef.instance.closeEvent.subscribe(() => this.close());
        this.modalConfigRef.onDestroy.pipe(takeUntil(this.unsub$)).subscribe((message) => this.close(message));

        this.dialogMainRef.instance.title = options?.title;
        this.dialogMainRef.instance.message = options?.message;
        this.dialogMainRef.instance.width = options?.width;
        this.dialogMainRef.instance.height = options?.height;
        this.dialogMainRef.instance.data = options?.data;

        document.body.appendChild(this.dialogMainRef.location.nativeElement);

        this.dialogComponentRef.changeDetectorRef.detectChanges();
            
        this.appRef.attachView(this.dialogMainRef.hostView);
        this.appRef.attachView(this.dialogComponentRef.hostView);

        this.notifier$ = new Subject();
        return this.notifier$.asObservable();

    }

    close(status: {} = {}) {
        this.appRef.detachView(this.dialogMainRef.hostView);
        this.appRef.detachView(this.dialogComponentRef.hostView);
        this.unsub$.next();
        this.notifier$.next(status);
        this.notifier$.complete();
    }


}
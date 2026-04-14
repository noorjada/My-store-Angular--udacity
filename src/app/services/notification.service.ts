import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private messageSubject = new BehaviorSubject<string>('');
    message$ = this.messageSubject.asObservable();

    private timeout: any;

    show(message: string): void {
        this.messageSubject.next(message);
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.messageSubject.next('');
        }, 3000);
    }
}

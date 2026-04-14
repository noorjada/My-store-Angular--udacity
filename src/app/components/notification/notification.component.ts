import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-notification',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './notification.component.html',
    styleUrl: './notification.component.css'
})
export class NotificationComponent {
    message = '';

    constructor(private notificationService: NotificationService) {
        this.notificationService.message$.subscribe(msg => {
            this.message = msg;
        });
    }}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
    itemCount = 0;
    currentUser: User | null = null;
    isAuthenticated = false;

    constructor(
        private cartService: CartService,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.cartService.cart$.subscribe(() => {
            this.itemCount = this.cartService.getItemCount();
        });

        this.authService.currentUser$.subscribe(user => {
            this.currentUser = user;
        });

        this.authService.isAuthenticated$.subscribe(isAuth => {
            this.isAuthenticated = isAuth;
        });
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/']);
    }
}


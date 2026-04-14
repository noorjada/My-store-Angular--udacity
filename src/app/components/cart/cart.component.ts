import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';
import { CartItem } from '../../models/cart-item';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule, RouterLink, CartItemComponent],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
    cartItems: CartItem[] = [];
    total = 0;

    constructor(
        private cartService: CartService,
        private notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        this.cartService.cart$.subscribe(items => {
            this.cartItems = items;
            this.total = this.cartService.getTotal();
        });
    }

    handleRemove(productId: number): void {
        const item = this.cartItems.find(i => i.product.id === productId);
        this.cartService.removeFromCart(productId);
        if (item) {
            this.notificationService.show(`${item.product.name} removed from cart`);
        }
    }

    handleUpdateQty(event: { productId: number; quantity: number }): void {
        this.cartService.updateQuantity(event.productId, event.quantity);
    }
}

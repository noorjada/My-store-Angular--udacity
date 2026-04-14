import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartItem } from '../../models/cart-item';

@Component({
    selector: 'app-cart-item',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './cart-item.component.html',
    styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
    @Input() item!: CartItem;
    @Output() remove = new EventEmitter<number>();
    @Output() updateQty = new EventEmitter<{ productId: number; quantity: number }>();

    onQuantityChange(value: number): void {
        this.updateQty.emit({ productId: this.item.product.id, quantity: +value });
    }

    onRemove(): void {
        this.remove.emit(this.item.product.id);
    }
}

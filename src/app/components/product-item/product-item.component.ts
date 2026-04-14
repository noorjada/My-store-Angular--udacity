import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product';

@Component({
    selector: 'app-product-item',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './product-item.component.html',
    styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
    @Input() product!: Product;
    @Output() addToCart = new EventEmitter<{ product: Product; quantity: number }>();

    quantity = 1;

    onQuantityChange(value: number): void {
        this.quantity = Math.max(1, Math.min(10, value));
    }

    onAddToCart(): void {
        this.addToCart.emit({ product: this.product, quantity: this.quantity });
        this.quantity = 1;
    }
}

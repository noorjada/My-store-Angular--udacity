import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-product-details',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
    product: Product | undefined;
    quantity = 1;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private cartService: CartService,
        private notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.productService.getProduct(id).subscribe(product => {
            this.product = product;
        });
    }

    onQuantityChange(value: number): void {
        this.quantity = Math.max(1, Math.min(10, value));
    }

    addToCart(): void {
        if (this.product) {
            this.cartService.addToCart(this.product, this.quantity);
            this.notificationService.show(
                `${this.product.name} (x${this.quantity}) added to cart!`
            );
            this.quantity = 1;
        }
    }
}

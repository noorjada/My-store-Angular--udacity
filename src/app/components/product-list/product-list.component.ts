import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [CommonModule, ProductItemComponent],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
    products: Product[] = [];

    constructor(
        private productService: ProductService,
        private cartService: CartService,
        private notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(products => {
            this.products = products;
        });
    }

    handleAddToCart(event: { product: Product; quantity: number }): void {
        this.cartService.addToCart(event.product, event.quantity);
        this.notificationService.show(
            `${event.product.name} (x${event.quantity}) added to cart!`
        );
    }
}

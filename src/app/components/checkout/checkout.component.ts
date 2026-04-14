import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
    fullName = '';
    address = '';
    cardNumber = '';
    cvv = '';

    submitted = false;

    constructor(
        private cartService: CartService,
        private router: Router
    ) { }

    get total(): number {
        return this.cartService.getTotal();
    }

    get nameValid(): boolean {
        return this.fullName.trim().length >= 3;
    }

    get addressValid(): boolean {
        return this.address.trim().length >= 6;
    }

    get cardValid(): boolean {
        const digits = this.cardNumber.replace(/\s/g, '');
        return /^\d{16}$/.test(digits);
    }

    get cvvValid(): boolean {
        return /^\d{3,4}$/.test(this.cvv);
    }

    get isValid(): boolean {
        return this.nameValid && this.addressValid && this.cardValid && this.cvvValid;
    }

    onSubmit(): void {
        this.submitted = true;
        if (this.isValid) {
            this.cartService.clearCart();
            this.router.navigate(['/confirmation']);
        }
    }
}

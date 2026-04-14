import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  showForm = false;
  isEditing = false;
  currentProductId: number | null = null;

  formData: any = {
    name: '',
    price: 0,
    description: '',
    base64Image: ''
  };

  imagePreview: string | ArrayBuffer | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => this.products = products,
      error: (err) => console.error('Failed to load products', err)
    });
  }

  openAddForm(): void {
    this.showForm = true;
    this.isEditing = false;
    this.currentProductId = null;
    this.resetForm();
  }

  openEditForm(product: Product): void {
    this.showForm = true;
    this.isEditing = true;
    this.currentProductId = product.id;
    this.formData = {
      name: product.name,
      price: product.price,
      description: product.description,
      base64Image: ''
    };
    this.imagePreview = product.url;
  }

  closeForm(): void {
    this.showForm = false;
    this.resetForm();
  }

  resetForm(): void {
    this.formData = { name: '', price: 0, description: '', base64Image: '' };
    this.imagePreview = null;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.formData.base64Image = reader.result as string;
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProduct(): void {
    if (this.isEditing && this.currentProductId) {
      this.productService.updateProduct(this.currentProductId, this.formData).subscribe({
        next: () => {
          this.loadProducts();
          this.closeForm();
        },
        error: (err) => console.error('Failed to update product', err)
      });
    } else {
      this.productService.addProduct(this.formData).subscribe({
        next: () => {
          this.loadProducts();
          this.closeForm();
        },
        error: (err) => console.error('Failed to add product', err)
      });
    }
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.loadProducts(),
        error: (err) => console.error('Failed to delete product', err)
      });
    }
  }
}

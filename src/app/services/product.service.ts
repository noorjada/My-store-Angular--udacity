import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl = 'http://localhost:3000/products';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }

    getProduct(id: number): Observable<Product | undefined> {
        return new Observable(observer => {
            this.http.get<Product>(`${this.apiUrl}/${id}`).subscribe(
                (product) => {
                    observer.next(product);
                    observer.complete();
                },
                (error) => {
                    observer.next(undefined);
                    observer.complete();
                }
            );
        });
    }

    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('auth_token');
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

    addProduct(productData: any): Observable<Product> {
        return this.http.post<Product>(this.apiUrl, productData, { headers: this.getAuthHeaders() });
    }

    updateProduct(id: number, productData: any): Observable<Product> {
        return this.http.put<Product>(`${this.apiUrl}/${id}`, productData, { headers: this.getAuthHeaders() });
    }

    deleteProduct(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
    }
}

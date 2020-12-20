import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product.model';

import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<any>(environment.url_api + '/products').pipe(
      catchError(this.handleError('getProducts', { data: [] })),
      map((response) => response.data as Product[])
    );
  }

  searchProductByName(name: string): Observable<Product[]> {
    return this.http
      .get<Product[]>(environment.url_api + '/products?search=' + name)
      .pipe(
        catchError(this.handleError('searchProductByName', { data: [] })),
        map((response) => response.data as Product[])
      );
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(environment.url_api + '/products/' + id).pipe(
      catchError(this.handleError('getProduct', { data: {} })),
      map((response) => response.data as Product)
    );
  }

  createProduct(product: Partial<Product>): Observable<string> {
    return this.http.post(environment.url_api + '/products', product).pipe(
      catchError(this.handleError('createProduct', { data: '' })),
      map((response) => response.data)
    );
  }

  updateProduct(
    productId: string,
    changes: Partial<Product>
  ): Observable<string> {
    return this.http
      .put(environment.url_api + '/products/' + productId, changes)
      .pipe(
        catchError(this.handleError('updateProduct', { data: '' })),
        map((response) => response.data)
      );
  }

  deleteProduct(productId: string): Observable<boolean> {
    return this.http
      .delete<boolean>(environment.url_api + '/products/' + productId)
      .pipe(
        catchError(this.handleError('deleteProduct', { data: '' })),
        map((response) => response.data)
      );
  }

  private handleError(operation = 'operation', result) {
    return (error: any): Observable<any> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result);
    };
  }
}

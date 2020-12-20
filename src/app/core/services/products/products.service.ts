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
      catchError(this.handleError('getProducts', {data: []})),
      map((response) => response.data as Product[])
    );
  }

  searchProductByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      environment.url_api + '/products?search=' + name
    );
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(environment.url_api + '/products/' + id);
  }

  createProduct(product: Product): Observable<object> {
    return this.http.post(environment.url_api + '/products', product);
  }

  updateProduct(
    productId: string,
    changes: Partial<Product>
  ): Observable<object> {
    return this.http.put(
      environment.url_api + '/products/' + productId,
      changes
    );
  }

  deleteProduct(productId: string): Observable<boolean> {
    return this.http.delete<boolean>(
      environment.url_api + '/products/' + productId
    );
  }

  private handleError(operation = 'operation', result) {
    return (error: any): Observable<any> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result);
    };
  }
}

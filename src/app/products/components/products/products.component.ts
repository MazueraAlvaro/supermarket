import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { ProductShowComponent } from '../product-show/product-show.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  displayedColumns = [
    'index',
    'name',
    'category',
    'price',
    'quantity',
    'actions',
  ];
  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productsService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  deleteProduct(productId: string, index): void {
    this.productsService.deleteProduct(productId).subscribe((deletedId) => {
      if (deletedId === productId) {
        this.products.splice(index, 1);
        this.products = [...this.products];
      }
    });
  }

  showProduct(productId: string): void{
    this.productsService.getProduct(productId)
    .subscribe(product => {
      const dialogRef = this.dialog.open(ProductShowComponent, {
        data: product,
        width: '400px'
      });
    });
  }
}

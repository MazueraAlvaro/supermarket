import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { ProductShowComponent } from '../product-show/product-show.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, AfterViewInit {
  products: Product[] = [];
  displayedColumns = [
    'index',
    'name',
    'category',
    'price',
    'quantity',
    'actions',
  ];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog
    ) {
      this.dataSource = new MatTableDataSource();
    }

  ngOnInit(): void {
    this.fetchProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  fetchProducts(): void {
    this.productsService.getAllProducts().subscribe((products) => {
      this.products = products;
      this.dataSource.data = products;
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

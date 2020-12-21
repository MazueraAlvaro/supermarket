import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
  displayedColumns = [
    'index',
    'name',
    'category',
    'price',
    'quantity',
    'actions',
  ];
  dataSource: MatTableDataSource<Product>;
  searchControl: FormControl;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog
    ) {
      this.dataSource = new MatTableDataSource();
      this.searchControl = new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]);
    }

  ngOnInit(): void {
    this.fetchProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  fetchProducts(): void {
    this.productsService.getAllProducts().subscribe((products) => {
      this.dataSource.data = products;
    });
  }

  deleteProduct(productId: string, index): void {
    this.productsService.deleteProduct(productId).subscribe((deletedId) => {
      if (deletedId === productId) {
        const products = this.dataSource.data;
        products.splice(index, 1);
        this.dataSource.data = [...products];
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

  searchProduct(): void{
    if(this.searchControl.valid){
      this.productsService.searchProductByName(this.searchControl.value)
      .subscribe(products => {
        this.dataSource.data = products;
      })
    }
  }
}

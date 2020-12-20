import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProductsComponent, ProductEditComponent, ProductCreateComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }

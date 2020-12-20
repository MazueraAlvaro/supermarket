import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent {
  productForm = this.fb.group({
    name: [null, [Validators.required, Validators.maxLength(80)]],
    price: [null, [Validators.required, Validators.min(0)]],
    quantity: [null, [Validators.required, Validators.min(0)]],
    description: [null, [Validators.required, Validators.minLength(10)]],
    category: [null, Validators.required],
  });

  hasUnitNumber = false;

  categories = [
    'Frutas',
    'Abarrotes',
    'Verduras',
    'Carnes',
    'Aseo',
    'Enlatados',
    'Especias',
  ];

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private router: Router
  ) {}

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.productForm.valid) {
      const product = this.productForm.value;
      this.productsService.createProduct(product).subscribe((newProductId) => {
        if (newProductId !== ''){
          this.router.navigate(['./products']);
        }
      });
    }
  }
}

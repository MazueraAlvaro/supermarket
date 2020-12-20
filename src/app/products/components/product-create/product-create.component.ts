import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  productForm = this.fb.group({
    name: [null, Validators.required],
    price: [null, Validators.required],
    quantity: [null, Validators.required],
    description: [null, Validators.required],
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
    'Especias'
  ];

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    alert('Thanks!');
  }
}

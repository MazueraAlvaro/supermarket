import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {

  productForm: FormGroup;

  hasUnitNumber = false;

  categories = [
    'Abarrotes',
    'Aseo',
    'Carnes',
    'Enlatados',
    'Especias',
    'Frutas',
    'Verduras',
  ];

  productId: string;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      const productId = params.id;
      if (productId){
        this.productsService.getProduct(productId)
          .subscribe(product => {
            this.productForm.patchValue(product);
            this.productId = product._id;
        });
      }
    });
  }

  buildForm(): void{
    this.productForm = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(80)]],
      price: [null, [Validators.required, Validators.min(0)]],
      quantity: [null, [Validators.required, Validators.min(0)]],
      description: [null, [Validators.required, Validators.minLength(10)]],
      category: [null, Validators.required],
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.productForm.valid) {
      const product = this.productForm.value;
      if(this.productId){
        this.updateProduct(product);
      }
      else{
        this.createProduct(product);
      }
    }
  }

  createProduct(product: Partial<Product>): void{
    this.productsService.createProduct(product).subscribe((productId) => {
      if (productId !== ''){
        this.router.navigate(['./products']);
      }
    });
  }

  updateProduct(product: Partial<Product>): void{
    this.productsService.updateProduct(this.productId, product).subscribe((productId) => {
      if (productId !== ''){
        this.router.navigate(['./products']);
      }
    });
  }
}

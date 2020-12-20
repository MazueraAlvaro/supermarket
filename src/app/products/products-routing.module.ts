import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
    {
        path: '',
        component: ProductsComponent,
    },
    {
        path: 'edit/:id',
        component: ProductCreateComponent
    },
    {
        path: 'create',
        component: ProductCreateComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class ProductsRoutingModule {}

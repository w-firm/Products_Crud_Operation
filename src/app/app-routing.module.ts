import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ProductCreateComponent } from './admin/product-create/product-create.component';
import { ProductEditComponent } from './admin/product-edit/product-edit.component';
import { ProductsComponent } from './admin/products/products.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent
    // path: 'admin/products', component: ProductsComponent
  },
  {
    path: 'admin', component: AdminComponent,
    children: [
      {
        path: 'products', component: ProductsComponent
      },
      {
        path: 'products/create', component: ProductCreateComponent
      },
      {
        path: 'products/:id/edit', component: ProductEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { sortBy } from 'lodash';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = []
  AllDetails: Product[] = [];
  currentPage = 1;
  searchControl = new FormControl();

  header = [
    { title: "id" },
    { title: "title" },
    { title: "image" },
    { title: "price" },
    { title: "details" },
    { title: "edit" },
    { title: "delete" },
  ]

  constructor(private productService: ProductService) { }

  ngOnInit(): void {


    this.searchControl.valueChanges.subscribe(val => {
      if (val) {
        let dataArr = this.AllDetails.filter(i => i.title.toLowerCase().includes(val.toLowerCase()));
        this.products = dataArr
      }
      if (val === null || val === '') {
        this.products = this.AllDetails
      }
    })

    this.productService.all().subscribe(
      product => {
        console.log('product: ', product);
        this.products = product

        this.products.forEach(k => {
          k.id = k._id
        })
        this.AllDetails = this.products
      }
    )
  }

  get pages(): number[] {
    const pageCount = Math.ceil(this.products.length / 5);
    return Array(pageCount).fill(0).map((x, i) => i + 1);
  }

  productDel(_id: number): void {
    this.productService.delete(_id).subscribe(
      () => {
        this.products = this.products.filter(p => p.id !== _id);
        console.log('_id: ', _id);
        console.log('this.products: ', this.products);
      }
    )
  }

}


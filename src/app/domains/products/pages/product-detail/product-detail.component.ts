import { CurrencyPipe } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export default class ProductDetailComponent {
  product = signal<Product | null>(null);
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  cover = signal('');

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idProduct = params.get('id');

      console.log('Product detail');
      console.log(idProduct);

      if (idProduct) {
        this.productService.getProductDetail(idProduct)
          .subscribe({
            next: (productDetail) => {
              this.product.set(productDetail);
              if (productDetail.images.length > 0) {
                this.cover.set(productDetail.images[0])
              }
            },
            error: (error) => {
              console.log("Error while getting product details");
              console.log(error);
            }
          })
      }
    })
  }

  changeCover(newImg: string) {
    this.cover.set(newImg);
  }

  addToCart() {
    const product = this.product();

    if (product) {
      this.cartService.addToCart(product);
    }
  }
}

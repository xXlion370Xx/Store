import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  hideSideMenu = signal(true);
  private cartService = inject(CartService)
  cart = this.cartService.cart;
  total = this.cartService.total;

  toogleSideMenu() {
    console.log("Asi esta al inicio");
    console.log(this.hideSideMenu());

    this.hideSideMenu.update(prevState => !prevState)
    console.log("Asi esta al final");
    console.log(this.hideSideMenu());

  }
}

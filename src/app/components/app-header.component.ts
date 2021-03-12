import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../interfaces/product.interfaces';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <img src="assets/logo.svg" alt="logo" class="logo-app">
      <h1>Ninja Store</h1>
      <div
        class="ball"
        (click)="toggle()"
        *ngIf="totalItems || showCartList"  
      >
        <img
          src="assets/shopping-cart.svg"
          alt="Shopping Cart"
          class="image-cart"
        >
        {{ totalItems }}
      </div>
    </header>
  `,
  styles: [`
    
    header {
      background: #000;
      color: #FFF;
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100vw;
      height: 70px;
      position: fixed;
      top: 0;
    }

    .logo-app {
      width: 25px;
    }

    h1 {
      margin: 0;
      padding: 0;
    }

    .image-cart {
      width: 18px;
      margin-right: 0.2em;
    }

    .ball {
      width: 55px;
      height: 55px;
      background: #3500da;
      color: #FFF;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
      cursor: pointer;
      will-change: transform, opacity;
      animation: forwards popIn 600ms ease;
    }

  `]
})
export class AppHeaderComponent  {
  @Input() products: Product[] = []
  @Input() showCartList: boolean = false
  @Output() onToggle: EventEmitter<boolean> = new EventEmitter()

  toggle() {
    this.onToggle.emit(!this.showCartList)
  }

  get totalItems() {
    return this.products
      .map(item => item.quantity)
      .reduce((prev, next) => prev + next, 0)
  }
}

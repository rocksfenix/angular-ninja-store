import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Product } from '../interfaces/product.interfaces';

@Component({
  selector: 'cart-list',
  template: `
    <div class="container" *ngIf="show">
      <button (click)="close()" class="remove-button close-button">
        <i class="icon-close"></i>
      </button>
      <h3>Elementos Agregados</h3>
      <ul>
        <li *ngFor="let item of items">
          <div
            class="item-image"
            [style]="'background-image: url(' + item.image + ')'"
          >
            <div class="num-items">
              {{ item.quantity }}
            </div>
          </div>
          {{ item.title }}
          <div class="price">
            {{ item.price | currency }}
          </div>
          <button (click)="remove(item)" class="remove-button">
            <i class="icon-close-outline"></i>
          </button>
        </li>
      </ul>
      <div>Subtotal <strong>{{ subtotal | currency }}</strong></div>
      <div>Total <strong>{{total | currency }}</strong></div>
      <div>
        <button (click)="pay()">
          Pagar
        </button>
      </div>
    </div>
  `,
  styles: [`

    ul {
      margin: 0;
      padding: 1em;
    }

    .close-button {
      float: right;
    }

    .remove-button {
      color: #FFF;
      background: transparent;
      border: 0;
      font-size: 20px;
      cursor: pointer;
    }

    .price {
      font-weight: 200;
    }

    .num-items {
      position: absolute;
      background: #ff3600;
      color: #FFF;
      border-radius: 5px;
      padding: 0 5px;
      font-size: 12px;
      top: -5px;
      left: -8px;
    }

    .item-image {
      width: 30px;
      height: 30px;
      background-size: cover;
      background-position: center;
      border-radius: 50%;
      margin-right: 1em;
      position: relative;
    }
  
    .container {
      background: #222;
      padding: 1em;
      border-radius: 5px;
      box-shadow: 0px 5px 20px rgba(0,0,0,0.44);
      color: #71adff;
      position: fixed;
      top: 75px;
      right: 8px;
      min-width: 365px;
      animation: forwards popIn 400ms ease;
      will-change: transform, opacity;
    }

    li {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 55px;
    }

  `]
})
export class CartListComponent implements OnInit, OnDestroy {

  @Input() show = false
  @Input() items: Product[]

  @Output() onClose = new EventEmitter()
  @Output() onPay = new EventEmitter()
  @Output() onRemove: EventEmitter<Product> = new EventEmitter()

  tax = 0.16

  onScroll() {
    this.close()
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll.bind(this))
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll.bind(this))
  }

  get subtotal() {
    // [111.6, 17.58]
    return this.items
      .map(item => item.quantity * item.price) 
      .reduce((prev, next) => prev + next, 0)
  }

  get total() {
    const totalTax = this.subtotal * this.tax
    return this.subtotal + totalTax
  }

  close() {
    this.onClose.emit()
  }

  pay() {
    this.onPay.emit()
  }

  remove(item: Product) {
    this.onRemove.emit(item)
  }

}

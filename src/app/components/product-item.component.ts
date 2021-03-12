import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../interfaces/product.interfaces';

@Component({
  selector: 'product-item',
  template: `
    <div class="card">
      <!-- Informacion de producto -->
      <div>
        <h3 class="title">{{ product.title }}</h3>
        <p>{{ product.price | currency }}</p>
        <p>{{ product.stock }} Disponibles</p>
        <input
          type="number"
          value="1"
          min="1"
          [max]="product.stock"
          #quantity
        >
        <button (click)="addCart(quantity.value)">
          Agregar a Carrito
        </button>
      </div>

      <!-- Imagen de Producto -->
      <div class="image-container">
        <img
          [src]="product.image"
          [alt]="product.title"
        >
      </div>
    </div>
  `,
  styles: [`
  
    .card {
      border-radius: 5px;
      margin: 1em 5px;
      padding: 1em;
      box-shadow: 0 2px 7px rgba(0,0,0, 0.35);
      display: flex;
      flex-direction: row;
    }

    @media (min-width: 1000px) {
      .card {
        width: 450px;
      }
    }

    .title {
      color: #454aa2;
      font-weight: 600;
    }

    .image-container {
      margin-left: 2em;
    }

    img {
      max-width: 150px;
      max-height: 200px;
    }

    input {
      font-size: 19px;
      max-width: 40px;
    }

    button {
      background: #454aa2;
      color: #FFF;
      border: 1px solid transparent;
      font-size: 19px;
      cursor: pointer;
      border-radius: 0 5px 5px 0;
      transition: background 250ms ease;
    }

    button:hover {
      background: blue;
    }

  `]
})
export class ProductItemComponent {
  @Input() product: Product
  @Output() onAddCart = new EventEmitter()

  addCart(quantity: number) {
    const { stock } = this.product
    // Emitir la informacion al padre
    if (stock >= 1 && +quantity <= stock) {
      this.onAddCart.emit({
        ...this.product,
        quantity: Number(quantity)
      })
    }
  }

}

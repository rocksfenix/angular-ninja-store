import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from './interfaces/product.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  products: Product[] = []
  shoppingCart: Product[] = []
  showCartList = false
  
  constructor(
    private http: HttpClient
  ) { }
  
  ngOnInit(): void {
    this.http.get<Product[]>('http://localhost:3000/products')
      .subscribe((data) => {
        console.log(data)
        this.products = data
      })
  }

  addItem(product: Product) {
    console.log(product)

    // #1 - Agregar el producto al carrito
    const exists = this.shoppingCart.find(item => item.id === product.id)

    if (!exists) {
      this.shoppingCart.push(product)
    } else {
      // Actualizar la propiedad quantity
      this.shoppingCart = this.shoppingCart.map(item => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + product.quantity
          }
        }

        return item
      })
    }


    // #2 - Actualizar el stock de la lista de productos
    this.products = this.products.map(item => {
      if (item.id === product.id) {
        return {
          ...item,
          stock: item.stock - product.quantity
        }
      }
      return item
    })
  }

  removeItem(product: Product) {
    // console.log('Se quito de lista', product)
    // #1 - Eliminar el producto del shoppingCart
    this.shoppingCart = this.shoppingCart.filter(
      item => item.id !== product.id
    )

    // #2 - Agregar stock a productos
    this.products = this.products.map(item => {
      if (item.id === product.id) {
        return {
          ...item,
          stock: item.stock + product.quantity
        }
      }
      return item
    })
  }

  toggle(show: boolean) {
    console.log(show)
    this.showCartList = show
  }

  get productsInStock() {
    return this.products.filter(p => p.stock)
  }

}

import '../styles/main.scss'

import { loadProduct } from './app/load-product.js'
import { loadProducts } from './app/load-products.js'

const match = window.location.pathname.match(/^\/product\/(\d+)\/detail$/)

if (match) {
    const productId = parseInt(match[1], 10)
    loadProduct(productId)
    loadProducts() /* @future - Bette solution, loading after close ProductDetail */
} else {
    loadProducts()
}
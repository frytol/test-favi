import { ComponentEmpty } from './status/empty.js'
import { ProductsCard } from './products-card.js'

export function ProductsList(products = []) {
    const component = document.createElement('div')

    component.className = 'x-products-list'
    component.innerHTML = `
        <div class="x-products-list__items">
            ${!products.length ? ComponentEmpty() : ''}
        </div>
    `

    const items = component.querySelector('.x-products-list__items')

    if (products.length) {
        products.forEach(product => {
            items.appendChild(ProductsCard(product))
        })
    }

    return component.firstElementChild
}
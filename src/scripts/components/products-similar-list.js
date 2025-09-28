import { ComponentEmpty } from './status/empty.js'
import { ProductsCard } from './products-card.js'

export function ProductsSimilarList(products = []) {
    const component = document.createElement('div')
    component.innerHTML = `
        <div class="x-products-similar-list__items">
            ${!products.length ? ComponentEmpty() : ''}
        </div>
    `

    const items = component.querySelector('.x-products-similar-list__items')

    if (products.length) {
        products.forEach(product => {
            items.appendChild(ProductsCard(product))
        })
    }

    return component.firstElementChild
}
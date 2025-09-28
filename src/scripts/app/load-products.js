import { ProductsList } from '../components/products-list.js'
import { SkeletonProductsList } from '../components/skeleton/products-list.js'
import { ComponentError } from '../components/status/error.js'

const API_DELAY = 5000
const container = document.getElementById('product-list')

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export async function loadProducts() {
    const skeleton = SkeletonProductsList()

    container.innerHTML = ''
    container.appendChild(skeleton)

    try {
        const response = await fetch('/src/api/products.json')
        await delay(API_DELAY)

        if (!response.ok) throw new Error('Chyba při načítání produktů')

        const products = await response.json()
        const productListElement = ProductsList(products)

        container.innerHTML = ''
        container.appendChild(productListElement)
    } catch (error) {
        container.innerHTML = ComponentError()
        console.error(error)
    }
}
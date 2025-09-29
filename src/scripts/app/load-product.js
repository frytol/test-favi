import { delay } from './utils/delay.js'

import { SkeletonProductDetail } from '../components/skeleton/product-detail.js'
import { ComponentError } from '../components/status/error.js'
import { ProductDetail } from '../components/product-detail.js'

const API_DELAY = 5000

export async function loadProduct(productId) {
    const existing = document.querySelector('.x-product-detail')

    if (existing) {
        existing.remove()
    }

    history.pushState(null, '', `/product/${productId}/detail`)

    const container = document.createElement('div')
    container.className = 'x-product-detail'

    const skeleton = SkeletonProductDetail()
    container.appendChild(skeleton)
    document.body.appendChild(container)
    document.documentElement.classList.add('no-scroll')
    container.classList.add('open')

    try {
        const response = await fetch('/src/api/products.json')
        await delay(API_DELAY)

        if (!response.ok) throw new Error('Chyba při načítání detailu produktu')

        const products = await response.json()
        const product = products.find(item => item.id === productId)

        if (!product) {
            container.innerHTML = ComponentError('Produkt nenalezen') // @future use for better information

            return
        }

        const component = ProductDetail(product)
        container.innerHTML = ''
        container.appendChild(component)
    } catch (error) {
        container.innerHTML = ComponentError()
        console.error(error)
    }
}
import { ProductDetail } from '../components/product-detail.js'
import { SkeletonProductDetail } from '../components/skeleton/product-detail.js'
import { ComponentError } from '../components/status/error.js'

const API_DELAY = 5000

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export async function loadProduct(productId) {
    history.pushState(null, '', `/product/${productId}/detail`)

    const container = document.createElement('div')
    container.className = 'x-product-detail'

    const skeleton = SkeletonProductDetail()
    container.appendChild(skeleton)
    document.body.appendChild(container)

    try {
        const response = await fetch('/src/api/products.json')
        await delay(API_DELAY)

        if (!response.ok) throw new Error('Chyba při načítání detailu produktu')

        const allProducts = await response.json()
        const product = allProducts.find(p => p.id === productId)

        if (!product) {
            container.innerHTML = ComponentError('Produkt nenalezen')
            return
        }

        const detailComponent = ProductDetail(product)
        container.innerHTML = ''
        container.appendChild(detailComponent)

        detailComponent.querySelector('.ui-button-close').addEventListener('click', () => {
            container.remove()
            history.pushState(null, '', '/')
        })

    } catch (error) {
        container.innerHTML = ComponentError()
        console.error(error)
    }
}

import { delay } from './utils/delay.js'

import { SkeletonProductsSimilarList } from '../components/skeleton/products-similar-list.js'
import { ComponentError } from '../components/status/error.js'
import { ProductsSimilarList } from '../components/products-similar-list.js'

const API_DELAY = 5000

export async function loadProductsSimilar(container) {
    const skeleton = SkeletonProductsSimilarList()
    container.innerHTML = ''
    container.appendChild(skeleton)

    try {
        const response = await fetch('/src/api/products-similar.json')
        await delay(API_DELAY)

        if (!response.ok) throw new Error('Chyba při načítání podobné produkty')

        const products = await response.json()

        const component = ProductsSimilarList(products)
        container.innerHTML = ''
        container.appendChild(component)
    } catch (error) {
        container.innerHTML = ComponentError()
        console.error(error)
    }
}
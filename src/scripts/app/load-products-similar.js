import { delay } from './utils/delay.js'

import { SkeletonProductsSimilarList } from '../components/skeleton/products-similar-list.js'
import { ComponentError } from '../components/status/error.js'
import { ProductsSimilarList } from '../components/products-similar-list.js'

const API_DELAY = 5000

let cachedProducts = null
let cachedComponent = null
let loading = null

export async function loadProductsSimilar(container, useCache = true) {
    if (useCache && cachedComponent) {
        container.innerHTML = ''
        container.appendChild(cachedComponent.cloneNode(true))

        return true
    }

    const skeleton = SkeletonProductsSimilarList()
    container.innerHTML = ''
    container.appendChild(skeleton)

    try {
        if (!loading) {
            loading = (async () => {
                const response = await fetch('/src/api/products-similar.json')
                await delay(API_DELAY)
                if (!response.ok) throw new Error('Chyba při načítání podobné produkty')
                const products = await response.json()

                return products
            })()
        }

        const products = await loading

        cachedProducts = products

        const component = ProductsSimilarList(products)
        cachedComponent = component

        container.innerHTML = ''
        container.appendChild(component.cloneNode(true))

        return true
    } catch (error) {
        container.innerHTML = ComponentError()
        console.error(error)

        return false
    } finally {
        loading = null
    }
}
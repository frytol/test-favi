import { delay } from './utils/delay.js'

import { SkeletonProductsSimilarList } from '../components/skeleton/products-similar-list.js'
import { ComponentError } from '../components/status/error.js'
import { ProductsSimilarList } from '../components/products-similar-list.js'

const API_DELAY = 5000

let cachedProducts = null
let loading = null

export async function loadProductsSimilar(container, useCache = true) {
    if (useCache && cachedProducts) {
        container.innerHTML = ''
        container.appendChild(ProductsSimilarList(cachedProducts))

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
        cachedProducts = products // uložíme pouze data

        container.innerHTML = ''
        container.appendChild(ProductsSimilarList(products))

        return true
    } catch (error) {
        container.innerHTML = ComponentError()
        console.error(error)
        return false
    } finally {
        loading = null
    }
}
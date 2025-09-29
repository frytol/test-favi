import { loadProductsSimilar } from '../app/load-products-similar.js'
import { formatDelivery } from '../app/utils/format-delivery.js'
import { formatCurrency } from '../app/utils/format-currency.js'
import { renderStars } from '../app/utils/render-stars.js'

export function ProductDetail(product) {
    async function setActiveTab(tab) {
        [buttonProduct, buttonSimilar].forEach(btn => btn.classList.remove('active'))

        if (tab === 'detail') {
            buttonProduct.classList.add('active')
            history.pushState(null, '', `/product/${product.id}/detail`)
            body.innerHTML = ''
            body.appendChild(detailContent)
        } else if (tab === 'similar') {
            buttonSimilar.classList.add('active')
            history.pushState(null, '', `/product/${product.id}/podobne-produkty`)
            body.innerHTML = ''

            await loadProductsSimilar(similarListContainer, true)

            body.appendChild(similarListContainer)
        }
    }

    function prefetchSimilar() {
        if (hasPrefetched) return
        hasPrefetched = true

        const hidden = document.createElement('div')
        hidden.style.display = 'none'
        component.appendChild(hidden)

        loadProductsSimilar(hidden, true)
    }

    let hasPrefetched = false

    const component = document.createElement('div')
    component.className = 'x-product-detail__content'

    const tabs = document.createElement('div')
    tabs.className = 'x-product-detail__tabs'

    const buttonProduct = document.createElement('button')
    buttonProduct.className = 'ui-button-tab'
    buttonProduct.textContent = 'Produkt'
    buttonProduct.dataset.tab = 'detail'

    const buttonSimilar = document.createElement('button')
    buttonSimilar.className = 'ui-button-tab'
    buttonSimilar.textContent = 'Podobné produkty'
    buttonSimilar.dataset.tab = 'similar'

    const buttonClose = document.createElement('button')
    buttonClose.className = 'ui-button-close'
    buttonClose.innerHTML = `
        <svg class="ui-button-close__icon-file" aria-hidden="true">
            <use href="/images/sprite.svg#icon-x-mark"></use>
        </svg>
    `

    tabs.appendChild(buttonProduct)
    tabs.appendChild(buttonSimilar)
    tabs.appendChild(buttonClose)

    const body = document.createElement('div')
    body.className = 'x-product-detail__body'
    body.id = 'product-detail-body'

    const detailContent = document.createElement('div')
    detailContent.className = 'x-product-detail__product'
    detailContent.innerHTML = `
        <div class="x-product-detail__product-image">
            <img class="x-product-detail__product-image-file" src="${product.image_url}" alt="${product.name}" />
            <div class="x-product-detail__product-like ui-focus ui-focus--br-1" role="button" tabindex="0" aria-label="přidat produkt ${product.name} do oblíbeních">
                <svg class="x-product-detail__product-like-icon-file" aria-hidden="true">
                    <use href="/images/sprite.svg#icon-heart-solid"></use>
                </svg>
                ${product.like}
            </div>
        </div>
        <div class="x-product-detail__product-content">
            <span class="x-product-detail__product-review">
                <div class="x-product-detail__product-stars">
                    ${renderStars(product.review)}
                </div>
                <span class="x-product-detail__product-stars-value">${product.review_quntity}x</span>
            </span>
            <span class="x-product-detail__product-name">${product.name}</span>
            <div class="x-product-detail__product-delivery">
                <span class="x-product-detail__product-delivery-content ${product.delivery === 0 ? 'x-product-detail__product-delivery-content--stock' : ''}">
                    <svg class="x-product-detail__product-delivery-icon-file" aria-hidden="true">
                        <use href="/images/sprite.svg#icon-archive-box-solid"></use>
                    </svg>
                    <span class="x-product-detail__product-delivery-text">
                        ${formatDelivery(product.delivery)}
                    </span>
                </span>
            </div>
            <span class="x-product-detail__product-price">
                <span>${product.price}</span>
                <span>${formatCurrency(product.currency)}</span>
            </span>
        </div>
    `

    const similarListContainer = document.createElement('div')
    similarListContainer.id = 'product-similar-list'
    similarListContainer.className = 'x-products-similar-list'

    buttonProduct.addEventListener('click', () => setActiveTab('detail'))
    buttonSimilar.addEventListener('click', () => setActiveTab('similar'))

    buttonClose.addEventListener('click', () => {
        document.documentElement.classList.remove('no-scroll')
        const container = document.querySelector('.x-product-detail')
        container?.classList.remove('open')
        component.remove()
        history.pushState(null, '', '/')

        // @future - Focus after close to this item in list
    })

    component.appendChild(tabs)
    component.appendChild(body)

    setActiveTab('detail') /* @future - After reload check /detail or /podobne-produkty */

    setTimeout(prefetchSimilar, 100)

    return component
}
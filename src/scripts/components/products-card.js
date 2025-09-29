import { loadProduct } from '../app/load-product.js'
import { formatDelivery } from '../app/utils/format-delivery.js'
import { formatCurrency } from '../app/utils/format-currency.js'
import { renderStars } from '../app/utils/render-stars.js'

export function ProductsCard(product) {
    const component = document.createElement('div')
    component.className = 'x-products-card'
    component.innerHTML = `
        <div class="x-products-card__image">
            <img class="x-products-card__image-file" src="${product.image_url}" alt="${product.name}" />
        </div>
        <div class="x-products-card__like">
            <svg class="x-products-card__like-icon-file" aria-hidden="true">
                <use href="/images/sprite.svg#icon-heart-solid"></use>
            </svg>
            ${product.like}
        </div>
        <div class="x-products-card__text">
            <span class="x-products-card__review">
                <div class="x-products-card__stars">
                    ${renderStars(product.review)}
                </div>
                <span class="x-products-card__stars-value">${product.review_quntity}x</span>
            </span>
            <span class="x-products-card__name">${product.name}</span>
            <span class="x-products-card__price">
            <span>${product.price}</span>
                <span>${formatCurrency(product.currency)}</span>
            </span>
            <div class="x-products-card__delivery">
                <span class="x-products-card__delivery-content ${product.delivery === 0 ? 'x-products-card__delivery-content--stock' : ''}">
                    <svg class="x-products-card__delivery-icon-file" aria-hidden="true">
                        <use href="/images/sprite.svg#icon-archive-box-solid"></use>
                    </svg>
                    <span class="x-products-card__delivery-text">
                        ${formatDelivery(product.delivery)}
                    </span>
                </span>
            </div>
        </div>
    `

    component.addEventListener('click', () => {
        loadProduct(product.id)
    })

    return component
}
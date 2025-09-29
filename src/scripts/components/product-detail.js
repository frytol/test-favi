import { loadProductsSimilar } from '../app/load-products-similar.js'

export function ProductDetail(product) {
    function setActiveTab(tab) {
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
            body.appendChild(similarListContainer)

            loadProductsSimilar(similarListContainer)
        }
    }
    
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

    tabs.appendChild(buttonProduct)
    tabs.appendChild(buttonSimilar)

    const body = document.createElement('div')
    body.className = 'x-product-detail__body'
    body.id = 'product-detail-body'

    const detailContent = document.createElement('div')
    detailContent.className = 'x-product-detail__product'
    detailContent.innerHTML = `
        <button class="ui-button-close">Zavřít</button>
        <img class="x-product__image-file" src="${product.image_url}" alt="${product.name}" />
        <span>${product.name}</span>
        <span>${product.price}</span>
        <span>${product.currency}</span>
        <span>${product.delivery}</span>
        <span>${product.review}</span>
        <span>${product.review_quntity}</span>
        <span>${product.like}</span>
    `

    const similarListContainer = document.createElement('div')
    similarListContainer.id = 'product-similar-list'
    similarListContainer.className = 'x-product-similar-list'

    buttonProduct.addEventListener('click', () => setActiveTab('detail'))
    buttonSimilar.addEventListener('click', () => setActiveTab('similar'))

    detailContent.querySelector('.ui-button-close').addEventListener('click', () => {
        component.remove()
        history.pushState(null, '', '/')
    })

    component.appendChild(tabs)
    component.appendChild(body)

    setActiveTab('detail')

    return component
}
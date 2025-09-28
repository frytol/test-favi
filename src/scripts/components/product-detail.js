export function ProductDetail(product) {
    const component = document.createElement('div')

    component.className = 'x-product-detail__content'
    component.innerHTML = `
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

    return component
}
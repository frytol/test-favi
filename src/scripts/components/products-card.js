export function ProductsCard(product) {
    const component = document.createElement('div')

    component.className = 'x-products-card'
    component.innerHTML = `
        <img class="x-products-card__image-file" src="${product.image_url}" alt="${product.name}" />
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

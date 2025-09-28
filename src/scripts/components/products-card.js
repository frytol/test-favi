export function ProductsCard(product) {
    const component = document.createElement('div')

    component.className = 'x-product-card'
    component.innerHTML = `
        <img src="${product.image_url}" alt="${product.name}" />
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

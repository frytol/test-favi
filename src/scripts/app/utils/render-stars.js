export function renderStars(rating = 0, max = 5) {
    const rounded = Math.round(rating)
    const full = Math.min(rounded, max)
    const empty = max - full

    const stars = []

    for (let i = 0; i < full; i++) {
        stars.push(`<svg class="x-products-card__star-icon-file" aria-hidden="true">
            <use href="/images/sprite.svg#icon-star-solid"></use>
        </svg>`)
    }

    for (let i = 0; i < empty; i++) {
        stars.push(`<svg class="x-products-card__star-icon-file" aria-hidden="true">
            <use href="/images/sprite.svg#icon-star"></use>
        </svg>`)
    }

    return stars.join('')
}

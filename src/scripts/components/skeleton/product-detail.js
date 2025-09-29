export function SkeletonProductDetail() {
    const component = document.createElement('div')
    
    component.className = 'x-skeleton x-skeleton--detail'
    component.innerHTML = `
        <div class="x-skeleton__items">
            <div class="x-skeleton__item"></div>
            <div class="x-skeleton__item"></div>
        </div>
    `

    return component
}
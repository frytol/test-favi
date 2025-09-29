export function SkeletonProductsSimilarList() {
    const component = document.createElement('div')
    
    component.className = 'x-skeleton'
    component.innerHTML = `
        <div class="x-skeleton__items">
            <div class="x-skeleton__item"></div>
            <div class="x-skeleton__item"></div>
            <div class="x-skeleton__item"></div>
            <div class="x-skeleton__item"></div>
        </div>
    `

    return component
}
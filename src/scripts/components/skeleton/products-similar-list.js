export function SkeletonProductsSimilarList() {
    const component = document.createElement('div')
    
    component.className = 'x-skeleton'
    component.innerHTML = `
        Načítání…
    `

    return component
}
const currencyMap = {
    czk: 'Kč',
    eur: '€'
}

export function formatCurrency(code) {
    return currencyMap[code] || code
}
function getDayLabel(days) {
    if (days === 1) return 'dne'
    return 'dnů'
}

export function formatDelivery(days) {
    if (days === 0) {
        return 'Skladem'
    }

    return `Do ${days} ${getDayLabel(days)}`
}
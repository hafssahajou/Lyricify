export const truncate = (string, n = 100) => {
    return (string.length > n ? string.slice(0, n) + '...' : string)
}
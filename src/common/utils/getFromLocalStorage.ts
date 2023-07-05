export const getFromLocalStorage = (key: any) => {
    const value = localStorage.getItem(key)

    if (value) {
        return JSON.parse(value)
    }
    return undefined
}
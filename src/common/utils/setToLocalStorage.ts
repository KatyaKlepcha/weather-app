export const setToLocalStorage = (value: any, key: string) => {
    localStorage.setItem(key, JSON.stringify(value))
}
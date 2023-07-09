export const setToLocalStorage = (value: any, key: string) => {
    const serializedState = JSON.stringify(value)
    localStorage.setItem(key, serializedState)

}
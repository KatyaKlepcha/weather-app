export const convertTemperature = (temperature: number, unit: string) => {
  if (unit === 'C') {
    return (temperature * 9) / 5 + 32 // Формула для перевода градусов Цельсия в Фаренгейты
  } else if (unit === 'F') {
    return ((temperature - 32) * 5) / 9 // Формула для перевода градусов Фаренгейта в Цельсии
  } else {
    throw new Error(`Unsupported unit '${unit}'`) // Обработка ошибок, если указана неизвестная единица измерения
  }
}

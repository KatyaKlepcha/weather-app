import { CoordType } from 'features/weather/weather.api'

export const getBrowserLocation = (): Promise<CoordType> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords
        resolve({ lat, lng } as CoordType)
      },
      (e) => {
        reject(e)
      },
      { enableHighAccuracy: true, timeout: 30000 },
    )
  })
}

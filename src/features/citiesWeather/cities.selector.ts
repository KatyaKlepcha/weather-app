import { RootState } from 'app/store'
export const selectCityLocal = (state: RootState) => state.citiesWeather.cityLocal
export const selectIsChangeLang = (state: RootState) => state.app.isChangeLang
// export const selectCity = (state: RootState) => state.citiesWeather.cities
export const selectCityLocalDegrees = (state: RootState) => state.citiesWeather.cityLocal.map((c) => c.degrees)
export type LangsType = keyof typeof Langs
export const Langs = {
  ru: 'ru',
  uk: 'uk',
  en: 'en',
}
export const getLang = (state: RootState) => state.app.lang

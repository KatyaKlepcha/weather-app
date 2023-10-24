import s from './Select.module.css'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { Langs, LangsType } from 'features/citiesWeather/cities.selector'
import { appActions } from 'app/app.slice'
import { ChangeEvent, useState } from 'react'
import { SlGlobe } from 'react-icons/sl'
import { useTranslation } from 'react-i18next'

type SelectPropsType = {
  lang: string | LangsType
}

const Select = (props: SelectPropsType) => {
  const [lang, setLang] = useState<LangsType | string>(props.lang)
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()

  const onItemClick = (event: ChangeEvent<HTMLSelectElement>) => {
    const lang = event.currentTarget.value
    setLang(lang)
    i18n.changeLanguage(lang)
    dispatch(appActions.changeLang({ lang: lang as LangsType }))
  }

  return (
    <div className={s.container}>
      <SlGlobe />
      <select value={lang} className={s.select} onChange={onItemClick}>
        {(Object.keys(Langs) as LangsType[]).map((item) => (
          <option key={item} defaultValue={props.lang}>
            {item.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select

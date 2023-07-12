import React, { Suspense } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { selectAppStatus } from './app.selector'
import Search from '../common/components/Search/Search'
import Select from '../common/components/Select/Select'
import { useTranslation } from 'react-i18next'

const locales: LocalesType = {
  EN: { title: 'English' },
  RU: { title: 'Русский' },
  UA: { title: 'Український' },
}

type LocalesType = {
  [key: string]: { title: string }
}

function App() {
  const { t, i18n } = useTranslation()
  const status = useAppSelector(selectAppStatus)
  const localesKeys = Object.keys(locales)

  const onChangeHandler = (lang: string) => {
    return i18n.changeLanguage(lang)
  }

  return (
    <Suspense fallback={'...loading'}>
      <div className="App">
        {status === 'loading' && <div>Loading</div>}
        <Select onChange={onChangeHandler} options={localesKeys} lang={i18n.language} />
        <Search />
        <Outlet />
      </div>
    </Suspense>
  )
}

export default App

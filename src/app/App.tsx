import React, { Suspense } from 'react'
import { useJsApiLoader } from '@react-google-maps/api'
import './App.css'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { selectAppStatus } from './app.selector'
import Select from '../common/components/Select/Select'
import { useTranslation } from 'react-i18next'
import Loader from 'common/components/Loader/Loader'
import PlacesAutocomplete from 'common/components/PlacesAutocomplete/PlacesAutocomplete'

const libraries: any[] = ['places']
function App() {
  const { i18n } = useTranslation()
  const status = useAppSelector(selectAppStatus)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyA9bslaj5Bl5nLuQQXe8rr_PkhDvvZqzMs',
    libraries,
    version: 'beta',
  })

  return (
    <Suspense fallback={'...loading'}>
      <div className="App">
        {status === 'loading' && <Loader />}
        <Select lang={i18n.language} />
        <PlacesAutocomplete isLoaded={isLoaded} />
        {isLoaded && <Outlet />}
      </div>
    </Suspense>
  )
}

export default App

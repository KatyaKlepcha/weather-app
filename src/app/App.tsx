import React from 'react';
import './App.css';
import {Outlet} from 'react-router-dom'
import {useAppSelector} from "../common/hooks/useAppSelector";
import {selectAppStatus} from "./app.selector";
import Search from "../common/components/Search/Search";
import Select from "../common/components/Select/Select";
import {Suspense} from 'react'
import { useTranslation } from 'react-i18next';

const locales: LocalesType = {
    en: {title: 'English'},
    ru: {title: 'Русский'},
    ua: {title: 'Український'}
}

type LocalesType = {
    [key: string]: { title: string }
}


function App() {
    const {t, i18n} = useTranslation()
    const status = useAppSelector(selectAppStatus)

    return (
        <Suspense fallback={'...loading'}>
            <div className="App">
                {status === 'loading' && <div>Loading</div>}
                {Object.keys(locales).map(locale => <Select key={locale} onChange={() => i18n.resolvedLanguage(locale)}
                                                            options={locales[locale].title}/>)}
                <Search/>
                <Outlet/>
            </div>
        </Suspense>
    );
}

export default App;

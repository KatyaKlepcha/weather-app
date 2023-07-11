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
    EN: {title: 'English'},
    RU: {title: 'Русский'},
    UA: {title: 'Український'}
}

type LocalesType = {
    [key: string]: { title: string }
}

function App() {

    const {t, i18n} = useTranslation()
    const status = useAppSelector(selectAppStatus)
    const localesKeys =  Object.keys(locales)

    return (
        <Suspense fallback={'...loading'}>
            <div className="App">
                {status === 'loading' && <div>Loading</div>}
                <Select onChange={(lang: string) => i18n.changeLanguage(lang)} options ={localesKeys} lang={i18n.language} />
                <Search/>
                <Outlet/>
            </div>
        </Suspense>
    );
}

export default App;

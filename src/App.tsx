import React, {useEffect} from 'react';
import './App.css';
import {Outlet} from 'react-router-dom'
import {useAppSelector} from "./common/hooks/useAppSelector";
import {selectAppStatus} from "./app/app.selector";
import {useAppDispatch} from "./common/hooks/useAppDispatch";
import {getFromLocalStorage} from "./common/utils/getFromLocalStorage";
import {citiesWeatherThunks} from "./common/components/CitiesWeather/citiesWeather.slice";
import {appActions} from "./app/app.slice";

function App() {
    const dispatch = useAppDispatch();
    const isInitialized = useAppSelector(state => state.app.isInitialized)


    useEffect(() => {
        const citiesArray: string[] = getFromLocalStorage('current-city')

        if (citiesArray) {
            dispatch(citiesWeatherThunks.firstLoading(citiesArray)).then(()=>{
                dispatch(appActions.setInitialized({initializeStatus: true}))
            })
        }
    }, [])

    const status = useAppSelector(selectAppStatus)
    return (
        <div className="App">
            {status==='loading' && <div>Loading</div>}
            {isInitialized &&<Outlet/>}
        </div>
    );
}

export default App;

import React, {useEffect} from 'react';
import './App.css';
import {Outlet} from 'react-router-dom'
import {useAppSelector} from "./common/hooks/useAppSelector";
import {selectAppStatus} from "./app/app.selector";
import {useAppDispatch} from "./common/hooks/useAppDispatch";
import { weatherThunks} from "./features/weather/weather.slice";
import {citiesThunks} from "./common/components/Cities/cities.slice";

function App() {
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(citiesThunks.getCities({}))
        dispatch(weatherThunks.getStartWeather({}))
        // dispatch(weatherThunks.getSummaryWeather({location: 'Minsk', degrees: 'metric'}))
    }, [])

    const status = useAppSelector(selectAppStatus)
    return (
        <div className="App">
            {status==='loading' && <div>Loading</div>}
            <Outlet/>
        </div>
    );
}

export default App;

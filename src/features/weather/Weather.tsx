import React from 'react';
import City from '../../common/components/City/City';
import Search from "../../common/components/Search/Search";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {CitiesWeatherType} from '../../common/components/CitiesWeather/citiesWeather.slice';

const Weather = () => {
    const cities: CitiesWeatherType = useAppSelector(state => state.citiesWeather.citiesWeather)
    console.log('cities', cities)

    return (
        <div>
            <Search/>
            {Object.keys(cities).map(city => Object.keys(cities[city]).length !== 0 &&
                <City key={cities[city].id} city={city} weather={cities[city]}/>)}
        </div>
    );
};

export default Weather;
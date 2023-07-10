import React, {ChangeEvent, useEffect, useState, KeyboardEvent} from 'react';
import s from './Search.module.css'
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useDebounce} from "../../hooks/useDebounce";
import {citiesWeatherThunks} from "../../../features/citiesWeather/citiesWeather.slice";
import {useAppSelector} from "../../hooks/useAppSelector";

const Search = () => {
    const [searchCity, setSearchCity] = useState('')
    const [error, setError] = useState<string | null>(null)
    const debouncedSearchCity = useDebounce(searchCity, 500)
    const cityLocal = useAppSelector(state => state.citiesWeather.cityLocal)

    const dispatch = useAppDispatch();

    useEffect(() => {
    }, [debouncedSearchCity])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setSearchCity(e.currentTarget.value)
    }

    const onAddCity = () => {
        if (searchCity.trim() !== "") {
            const newSearchCity = searchCity[0].toUpperCase() + searchCity.slice(1);
            const index = cityLocal.findIndex((city) => city.name === newSearchCity)
            if (index === -1) {
                dispatch(citiesWeatherThunks.getSummaryWeather({
                    location: newSearchCity,
                    degrees: 'metric',
                }))
            } else {
                setError('A city with the same name has already been found')
            }
            setSearchCity('')
        } else {
            setError('Enter city name to search')
        }

    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.key === 'Enter') {
            onAddCity();
        }
    };

    return (
        <div className={s.searchContainer}>
            <div>
                <input className={s.input} onChange={onChangeHandler} value={searchCity} onKeyDown={onKeyDownHandler}/>
                <button className={s.buttonAdd} onClick={onAddCity}>Add</button>
                {error && <div className={s.error}>{error}</div>}
            </div>
        </div>
    );
};

export default Search;
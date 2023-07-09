import React, {ChangeEvent, useEffect, useState, KeyboardEvent} from 'react';
import s from './Search.module.css'
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useDebounce} from "../../hooks/useDebounce";
import {citiesWeatherThunks} from "../../../features/citiesWeather/citiesWeather.slice";

const Search = () => {
    const [searchCity, setSearchCity] = useState('')
    const [error, setError] = useState<string | null>(null)
    const debouncedSearchCity = useDebounce(searchCity, 500)

    const dispatch = useAppDispatch();

    useEffect(() => {
    }, [debouncedSearchCity])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setSearchCity(e.currentTarget.value)
    }

    const onAddCity = () => {
        if (searchCity.trim() !== "") {
            dispatch(citiesWeatherThunks.getSummaryWeather({location: searchCity, degrees: 'metric', show: true}))
            setSearchCity('')
        } else {
            setError('Enter city name to search')
        }

    }

    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (error !== null) {
    //         setError(null);
    //     }
    //     dispatch(citiesWeatherThunks.findCity(searchCity))
    // };

    return (
        <div className={s.searchContainer}>
            <div>
                <input className={s.input} onChange={onChangeHandler} value={searchCity}/>
                <button className={s.buttonAdd} onClick={onAddCity}>Add</button>
                {error && <div className={s.error}>{error}</div>}
            </div>
        </div>
    );
};

export default Search;
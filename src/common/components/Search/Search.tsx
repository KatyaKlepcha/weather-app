import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './Search.module.css'
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useDebounce} from "../../hooks/useDebounce";
import {citiesWeatherThunks} from "../../../features/CitiesWeather/citiesWeather.slice";

const Search = () => {
    const [searchCity, setSearchCity] = useState('')
    const debouncedSearchCity = useDebounce(searchCity, 500)

    const dispatch = useAppDispatch();

    useEffect(() => {}, [debouncedSearchCity])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchCity(e.currentTarget.value)
    }

    const onAddCity = () => {
        dispatch(citiesWeatherThunks.findCity(searchCity))
        setSearchCity('')
    }

    return (
        <div className={s.searchContainer}>
            <input className={s.input} onChange={onChangeHandler} value={searchCity}/>
            <button className={s.buttonAdd} onClick={onAddCity}>Add</button>
        </div>
    );
};

export default Search;
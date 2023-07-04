import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './Search.module.css'
import {weatherThunks} from "../../../features/weather/weather.slice";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";
import {citySelector} from "../../../features/weather/weather.selectors";
import {useDebounce} from "../../hooks/useDebounce";

const Search = () => {
    const cityName = useAppSelector(citySelector)
    const [searchCity, setSearchCity] = useState(cityName)
    const debouncedSearchCity = useDebounce(searchCity, 500)

    const dispatch = useAppDispatch();

    useEffect(() => {}, [debouncedSearchCity])

    // useEffect(()=>{
    //     dispatch(weatherThunks.getSummaryWeather({location: city}))
    // },[city])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchCity(e.currentTarget.value)
        console.log(e.currentTarget.value)
    }

    const onAddCity = () => {
        setSearchCity('')
        dispatch(weatherThunks.getSummaryWeather({location: searchCity}))
        // dispatch()
    }

    return (
        <div className={s.searchContainer}>
            <input className={s.input} onChange={onChangeHandler} value={searchCity}/>
            <button className={s.buttonAdd} onClick={onAddCity}>Add</button>
        </div>
    );
};

export default Search;
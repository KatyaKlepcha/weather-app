import React from 'react';
import City from '../../common/components/City/City';
import Search from "../../common/components/Search/Search";

const Weather = () => {
    return (
        <div>
            <Search/>
            <City/>
        </div>
    );
};

export default Weather;
import React from 'react';
import './App.css';
import {Outlet} from 'react-router-dom'
import {useAppSelector} from "../common/hooks/useAppSelector";
import {selectAppStatus} from "./app.selector";

function App() {

    const status = useAppSelector(selectAppStatus)
    return (
        <div className="App">
            {status === 'loading' && <div>Loading</div>}
            <Outlet/>
        </div>
    );
}

export default App;

import { createBrowserRouter } from "react-router-dom";
import App from "../../app/App";
import Weather from "../../features/weather/Weather";
import {PATHS} from "./PATH";

export const router =  createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: PATHS.weather,
                element: <Weather />,
            }]
    },
]);

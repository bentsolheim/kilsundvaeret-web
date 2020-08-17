import React, {useEffect, useState} from 'react';
import './App.css';
import {fetchCurrentWeather, WeatherReport} from './api/Api'
import {CurrentWeather} from "./components/CurrentWeather";

const App = () => {

    const [weatherReport, setWeatherReport] = useState<WeatherReport | undefined>(undefined);

    useEffect(() => {
        (async () => {
            setWeatherReport(await fetchCurrentWeather());
        })()
    }, []);
    const c = weatherReport ? <CurrentWeather weatherReport={weatherReport} /> : <div>Missing</div>
    return (
        <div>
            <h1>Kilsundværet</h1>
            {c}
        </div>
    );
}

export default App;

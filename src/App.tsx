import React, {useEffect, useState} from 'react';
import './App.css';
import {fetchRecentReadings, SensorReading} from './api/Api'

const App = () => {

    const [data, setData] = useState<SensorReading[] | undefined>(undefined);

    useEffect(() => {
        (async () => {
            setData(await fetchRecentReadings());
        })()
    }, []);
    return (
        <div>
            <h1>Kilsundværet</h1>
            {data && data.map((d) => <div key={d.sensorName}>{d.sensorName}: {d.value}</div>)}
        </div>
    );
}

export default App;

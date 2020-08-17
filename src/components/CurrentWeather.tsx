import React from 'react';
import {Metric, WeatherReport} from "../api/Api";
import './CurrentWeather.css'

type CurrentWeatherProps = {
    weatherReport: WeatherReport
}

export const CurrentWeather = ({weatherReport}: CurrentWeatherProps) => {
    console.log(JSON.stringify(weatherReport, null, 2));
    const typeIndex = new Map<string, Metric>();
    weatherReport.metrics.forEach((m) => {
        typeIndex.set(m.type.name, m)
    });
    const at: Metric | undefined = typeIndex.get("temperature");
    const wt: Metric | undefined = typeIndex.get("water-temperature");
    const p: Metric | undefined = typeIndex.get("air-pressure");
    const wd: Metric | undefined = typeIndex.get("wind-direction");
    const ws: Metric | undefined = typeIndex.get("wind-speed");
    return <div className="current-weather">
        {at ? <Temperature value={at.value}/> : <MissingMetric/>}
        {wt ? <WaterTemperature value={wt.value}/> : <MissingMetric/>}
        {p ? <Pressure value={p.value}/> : <MissingMetric/>}
        {wd && ws ? <Wind speed={ws.value} direction={wd.value}/> : <MissingMetric/>}
    </div>;
}

type ValueProps = {
    value: number
}

const MetricWrapper: React.FunctionComponent = (props) => <div className="metric">{props.children}</div>
const Label = (props: { title: string }) => <div className="label">{props.title}: </div>

const Temperature = (props: ValueProps) => {
    return <MetricWrapper><Label title="Lufttemperatur"/>{props.value} &deg;C</MetricWrapper>
}

const WaterTemperature = (props: ValueProps) => {
    return <MetricWrapper><Label title="Badetemperatur"/>{props.value} &deg;C</MetricWrapper>
}

const Pressure = (props: ValueProps) => {

    const pressure = props.value;
    let pressureCat = 'normal';
    if (pressure < 980) {
        pressureCat = 'low';
    } else if (pressure > 1025) {
        pressureCat = 'high';
    }
    const pressureCatNames: Record<string, string> = {'normal': 'Normaltrykk', 'low': 'Lavtrykk', 'high': 'Høytrykk'};
    const pressureCatName = pressureCatNames[pressureCat];
    return <MetricWrapper><Label title="Lufttrykk"/>{pressure} hPa ({pressureCatName})</MetricWrapper>
}

type WindProps = {
    speed: number,
    direction: number
}

const Wind = (props: WindProps) => {
    return <MetricWrapper>
        <Label title="Vind"/>{props.speed} m/s <WindDirection value={props.direction}/>
    </MetricWrapper>
}

const WindDirection = (props: ValueProps) => {
    const dir = props.value;
    const getDirectionKeyFromAngle = (angle: number) => {
        const step = 45.0;
        const base = step / 2
        let dirKey = 'unknown';
        if (angle > 360 - base || angle <= base) dirKey = 'north';
        else if (angle > base && angle <= base + step) dirKey = 'north-east';
        else if (angle > base + step && angle <= base + step * 2) dirKey = 'east';
        else if (angle > base + step * 2 && angle <= base + step * 3) dirKey = 'south-east';
        else if (angle > base + step * 3 && angle <= base + step * 4) dirKey = 'south';
        else if (angle > base + step * 4 && angle <= base + step * 5) dirKey = 'south-west';
        else if (angle > base + step * 5 && angle <= base + step * 6) dirKey = 'west';
        else if (angle > base + step * 6 && angle <= base + step * 7) dirKey = 'north-west';
        return dirKey;
    }

    const dirNames: Record<string, string> = {
        'north': 'Nord',
        'north-east': 'Nordøst',
        'east': 'Øst',
        'south-east': "Sørøst",
        'south': 'Sør',
        'south-west': 'Sørvest',
        'west': 'Vest',
        'north-west': 'Nordvest'
    };
    let dirKey = getDirectionKeyFromAngle(dir);
    console.log(dirKey);
    const dirName = dirNames[dirKey];
    console.log(dirName);

    return <>(fra {dirName.toLocaleLowerCase()})</>
}

const MissingMetric = () => {
    return <div>Missing</div>;
}
import axios from 'axios'

interface Response<T> {
    items: Array<T>
}

export interface WeatherReport {
    metrics: Array<Metric>
}

export interface MetricType {
    name: string
    unit: string
}

export interface Metric {
    type: MetricType
    value: number,
    createdDate: number
}

export const fetchCurrentWeather = async () => {
    const resp = await axios.get<Response<WeatherReport>>('/api/v1/reports/current-weather');
    return resp.data.items[0];
}
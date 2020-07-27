import axios from 'axios'

interface Response {
    items: Array<SensorReading>
}

export interface SensorReading {
    sensorName: string;
    value: number;
}

export const fetchRecentReadings = async () => {
    const resp = await axios.get<Response>('/api/v1/current-temp');

    return resp.data.items;
}
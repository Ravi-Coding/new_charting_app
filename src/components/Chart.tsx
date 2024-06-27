
import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts'; // import 

import { fetchChartData } from '../services/dataService';
import html2canvas from 'html2canvas';
import './Chart.css';

export interface DataPoint {   // creating DataPoint 
  timestamp: string;
  value: number;
}

const Chart: React.FC = () => {   // typescript safety , Rect.FunctionComponent as alias React.FC

  const [data, setData] = useState<DataPoint[]>([]);

  const [filteredData, setFilteredData] = useState<DataPoint[]>([]);

  const [timeframe, setTimeframe] = useState('daily');

  useEffect(() => {

    const loadData = async () => {
      const chartData = await fetchChartData();
      setData(chartData);
      filterData(chartData, 'daily');  // default 
    };
    loadData();
  }, []);

  const filterData = (data: DataPoint[], timeframe: string) => {

    let filtered = data;
    if (timeframe === 'weekly') {
      filtered = data.filter((_, index) => index % 7 === 0);  // bcz weekly 
    } else if (timeframe === 'monthly') {
      filtered = data.filter((_, index) => index % 30 === 0);  // bcz monthly
    }

    setFilteredData(filtered);
  };

  const handleTimeframeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    const newTimeframe = event.target.value;
    setTimeframe(newTimeframe);
    filterData(data, newTimeframe);
  };

  const exportChart = async () => {

    const chartElement = document.querySelector('.recharts-wrapper') as HTMLElement;
    
    if (chartElement) {
      const canvas = await html2canvas(chartElement);
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'chart.png';  // png form 
      link.click();
    }
  };

  return (
    <div className="chart-container">
      <div className="controls">
        <select onChange={handleTimeframeChange} value={timeframe}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <button onClick={exportChart}>Export Chart</button>
      </div>
      <ResponsiveContainer width="100%" height={400}>  
        <LineChart data={filteredData}>
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />  { /* brown */ }
          <Line type="monotone" dataKey="value" stroke="#ff7300" />  { /* green */ }
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

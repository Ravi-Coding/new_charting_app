import { DataPoint } from '../components/Chart';

export const fetchChartData = async (): Promise<DataPoint[]> => {
  const response = await fetch('/data.json');
  const data = await response.json();
  return data;
};

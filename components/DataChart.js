import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

export default ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart width={800} height={500} data={data}>
        <XAxis dataKey="Country" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="TotalConfirmed" stroke="#3445dd" />
        <Line type="monotone" dataKey="TotalDeaths" stroke="#ff3405" />
        <Line type="monotone" dataKey="TotalRecovered" stroke="#23dd34" />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

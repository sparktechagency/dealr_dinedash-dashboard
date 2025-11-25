/* eslint-disable react/prop-types */
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Legend,
  Line,
} from "recharts";

const Line_Chart = ({ allDownloads, isShow = true }) => {
  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <LineChart
          data={allDownloads}
          margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#185DDE", fontSize: 12, fontWeight: 500 }}
          />
          <YAxis
            domain={[0, 1000]}
            tick={{ fill: "#185DDE", fontSize: 12, fontWeight: 500 }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="user"
            stroke="#0061ff"
            strokeWidth={6}
            dot={{ r: 5, stroke: "#0061ff", strokeWidth: 2, fill: "#ffffff" }}
            activeDot={{ r: 8 }}
            name="Downloads"
          />
          {isShow && (
            <Line
              type="monotone"
              dataKey="subs"
              stroke="#a6c1ff"
              strokeWidth={6}
              dot={{ r: 5, stroke: "#a6c1ff", strokeWidth: 2, fill: "#ffffff" }}
              activeDot={{ r: 8 }}
              name="Subscribers"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Line_Chart;

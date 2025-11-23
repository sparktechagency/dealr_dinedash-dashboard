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

const data = [
  {
    name: "Jan",
    downloads: 650,
    subscribers: 400,
  },
  {
    name: "Feb",
    downloads: 850,
    subscribers: 600,
  },
  {
    name: "Mar",
    downloads: 500,
    subscribers: 300,
  },
  {
    name: "Apr",
    downloads: 650,
    subscribers: 400,
  },
  {
    name: "May",
    downloads: 354,
    subscribers: 235,
  },
  {
    name: "June",
    downloads: 900,
    subscribers: 700,
  },
  {
    name: "July",
    downloads: 650,
    subscribers: 400,
  },
  {
    name: "Aug",
    downloads: 850,
    subscribers: 600,
  },
  {
    name: "Sep",
    downloads: 500,
    subscribers: 300,
  },
  {
    name: "Oct",
    downloads: 650,
    subscribers: 400,
  },
  {
    name: "Nov",
    downloads: 354,
    subscribers: 235,
  },
  {
    name: "Dec",
    downloads: 900,
    subscribers: 700,
  },
];

const Line_Chart = ({ isShow = true }) => {
  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis
            dataKey="name"
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
            dataKey="downloads"
            stroke="#0061ff"
            strokeWidth={6}
            dot={{ r: 5, stroke: "#0061ff", strokeWidth: 2, fill: "#ffffff" }}
            activeDot={{ r: 8 }}
            name="Downloads"
          />
          {isShow && (
            <Line
              type="monotone"
              dataKey="subscribers"
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

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import { cn } from "../../utils/cn";

const Bar_Chart = ({ barCharData, className }) => {
  const yAxisTickFormatter = (value) => `${value / 1000}K`;
  const tickStyle = { fill: "#185DDE", fontSize: 12 };

  return (
    <div className={(cn(className), "w-full h-80")}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={barCharData}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          barCategoryGap={20}
        >
          <XAxis
            dataKey="month"
            tick={{ ...tickStyle }}
            tickMargin={6}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={yAxisTickFormatter}
            tick={{ ...tickStyle }}
            axisLine={{
              stroke: "#185DDE",
              strokeWidth: 2,
              strokeDasharray: "7 7",
            }}
            tickMargin={16}
          />
          {/* Optional horizontal grid lines */}
          <ReferenceLine y={1000} stroke="#185DDE" strokeWidth={0.4} />
          <ReferenceLine y={2000} stroke="#185DDE" strokeWidth={0.4} />
          <ReferenceLine y={3000} stroke="#185DDE" strokeWidth={0.4} />
          <ReferenceLine y={4000} stroke="#185DDE" strokeWidth={0.4} />
          <ReferenceLine y={5000} stroke="#185DDE" strokeWidth={0.4} />

          <Tooltip
            formatter={(value) => `${value}`}
            cursor={{ fill: "#185DDE", opacity: 0.1 }}
          />

          <Bar dataKey="uv" barSize={30} radius={[50, 50, 50, 50]}>
            {barCharData?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.uv ? "#185DDE" : "#F87171"} // fallback if value is 0 or undefined
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Bar_Chart;

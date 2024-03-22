import React, { PureComponent } from "react";
import { PieChart, Pie, Cell } from "recharts";

const RADIAN = Math.PI / 180;

const cx = 200;
const cy = 200;
const iR = 140;
const oR = 160;

const needle = (value, total, cx, cy, iR, oR, color) => {
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;
  if (!ang) return;

  return [
    <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" key={1} />,
    <path
      key={2}
      d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
      stroke="#none"
      fill={color}
    />,
  ];
};

const NeedleChart = ({ value, creditLine }) => {
  const data = [
    { name: "A", value: creditLine / 2, color: "#08eb26" },
    { name: "B", value: creditLine / 4, color: "#f46b09" },
    { name: "C", value: creditLine / 4, color: "#f80909" },
  ];
  let total = 0;
  data.forEach((v) => {
    total += v.value;
  });
  return (
    <PieChart width={400} height={210}>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={data}
        cx={cx}
        cy={cy}
        innerRadius={iR}
        outerRadius={oR}
        fill="#070443"
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={entry.color} />
        ))}
      </Pie>
      {needle(value, total, cx, cy, iR, oR, "#d0d000")}
    </PieChart>
  );
};

export default NeedleChart;

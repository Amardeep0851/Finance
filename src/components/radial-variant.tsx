import React from 'react';
import { 
  Tooltip,
  Legend, 
  RadialBar, 
  RadialBarChart, 
  ResponsiveContainer, 
} from "recharts";

import {formatPercentage } from "@/lib/utils";
import CategoriesTooltip from "./categories-tooltip";

type RadialProps = {
  data:
    | {
        value: number;
        name: string;
        percentageValue: number;
      }[]
    | undefined;
};

function CustomLegend({ payload }: any) {
  return (
    <ul className="">
      {payload.map((entry: any, index: number) => {
        // Calculate percentage for each entry
        return (
          <li
            key={`item-${index}`}
            className="flex items-center space-x-2"
          >
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <div className="space-x-1">
              <span className="text-sm text-muted-foreground">
                {entry.value}
              </span>
              <span className="text-sm">
                {formatPercentage(entry.payload.percentageValue)}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function RadialVariant({data}:RadialProps) {
    const COLORS = ['#0062FF', '#12C6FF', '#FF647F', '#FF9354'];
    return (
      <ResponsiveContainer width="100%" height={350}>
        <RadialBarChart
          cx="50%"
          cy="30%"
          innerRadius="90%"
          outerRadius="40%"
          data={data?.map((item, index) => ({
            ...item,
            fill: COLORS[index % COLORS.length],
          }))}
        >
         <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="right"
            iconType="circle"
            content={<CustomLegend />}
          />
          <Tooltip content={CategoriesTooltip} />
          <RadialBar
            label={{
              position: 'insideStart',
              fill: '#fff',
              fontSize: '12px',
            }}
            background
            dataKey="value"
          />
         
        </RadialBarChart>
      </ResponsiveContainer>
  )
}

export default RadialVariant
"use client"
import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { formatPercentage } from "@/lib/utils";
import CategoriesTooltip from "./categories-tooltip"

type PieProps = {
  data:
    | {
        value: number;
        name: string;
        percentageValue: number;
      }[]
    | undefined;
};

function CustomLegend({payload}:any){
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
                <span className="text-sm text-zinc-600">
                  {entry.payload.name}:
                </span>
                <span className="text-sm text-zinc-600">
                  {formatPercentage(entry.payload.percentageValue)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }


function PieVariant({ data }: PieProps) {
  const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"];
  return (
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={<CustomLegend />}
        />
          <Tooltip content={CategoriesTooltip} />
          <Pie
            cx="50%"
            cy="50%"
            data={data}
            dataKey="value"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            fill="8884d8"
            labelLine={false}
            style={{textTransform:"capitalize"}}
          >

          {data?.map((_item, index) => {
            return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />;
          })}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
  );
}

export default PieVariant;

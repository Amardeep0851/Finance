import React from 'react';
import {
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip
} from "recharts";
import CategoriesTooltip from "./categories-tooltip";

type RadarProps = {
  data:
    | {
        value: number;
        name: string;
        percentageValue: number;
      }[]
    | undefined;
};


function RadarVariant({data}:RadarProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart outerRadius={90}  cx="50%"cy="50%"  data={data} >

        <PolarGrid />
        <Tooltip content={<CategoriesTooltip />} />
        <PolarAngleAxis dataKey="name" style={{textTransform:"capitalize", fontSize:"12px"}} tickLine={true}/>
        <PolarRadiusAxis style={{ fontSize: '12px' }}  />
        <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export default RadarVariant
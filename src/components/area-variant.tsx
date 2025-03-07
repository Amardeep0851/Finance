import { format } from "date-fns"
import React from 'react'
import {
  Area, AreaChart, 
  XAxis, ResponsiveContainer, 
  Tooltip, CartesianGrid } from "recharts";
import CustomToolTip from "./custom-tooltip";
import { FileSearch } from "lucide-react";

type AreaVariantProps = {
  data:{
    income:number,
    expenses:number,
    date:string
  }[] | undefined
}
function AreaVariant({data}:AreaVariantProps) {
  if(!data){
    return <div className="flex flex-col items-center justify-center h-[350px] space-y-2 ">
      <FileSearch className="size-8 text-muted-foreground" />
      <p>No Date for This period.</p>
    </div>
  }
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
      <defs>
        <linearGradient id="income" x1="0" x2="0" y1="0" y2="0">
          <stop offset="2%" stopColor="#3d82bf" stopOpacity="0.8" />
          <stop offset="98%" stopColor="#3d82bf" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="expenses" x1="0" x2="0" y1="0" y2="1">
          <stop offset="2%" stopColor="#f43f5e" stopOpacity="0.8" />
          <stop offset="98%" stopColor="#f43f5e" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          tickFormatter={(value) => format(value, "dd MMM")}
          dataKey="date"
          tickLine={true}
          tickMargin={12}
          axisLine={false}
          style={{fontSize:"12px"}}
        />
        <Tooltip content={<CustomToolTip active payload label />} />
        <Area 
        type="basis"
        dataKey="income"
        strokeWidth="2px"
        stroke="#3d82f6"
        />
        <Area 
        type="basis"
        dataKey="expenses"
        strokeWidth="2px"
        stroke="#f43f5e"
        fill="url(#expenses)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default AreaVariant
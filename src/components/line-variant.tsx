import { format } from "date-fns"
import React from 'react'
import {Line, LineChart, XAxis, ResponsiveContainer, Tooltip, CartesianGrid} from "recharts";
import CustomToolTip from "./custom-tooltip";
import { FileSearch } from "lucide-react";

type LineVariantProps = {
  data:{
    income:number,
    expenses:number,
    date:string
  }[] | undefined
}
function LineVariant({data}:LineVariantProps) {
  if(!data){
    return <div className="flex flex-col items-center justify-center h-[350px] space-y-2 ">
      <FileSearch className="size-8 text-muted-foreground" />
      <p>No Date for This period.</p>
    </div>
  }
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
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
        <Line 
        type="basis"
        dataKey="income"
        strokeWidth="2px"
        stroke="#3d82f6"
        fill="url(#income)"
        className=" drop-shadow-sm"
        />
        <Line
        type="basis"
        dataKey="expenses"
        strokeWidth="2px"
        stroke="#f43f5e"
        fill="url(#expenses)"
        className=" drop-shadow-sm"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default LineVariant
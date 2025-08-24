import React, { useState } from 'react'
import { cva } from "class-variance-authority";
import { AreaChart, BarChart, LineChart, Loader2 } from "lucide-react";

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "./ui/card"
import { 
  Select, 
  SelectTrigger, 
  SelectContent, 
  SelectItem, 
  SelectValue  
} from "./ui/select";
import { Skeleton } from "./ui/skeleton";
import AreaVariant from "./area-variant";
import BarVariant from "./bar-variant";
import LineVariant from "./line-variant";

type ChartProps = {
  data:{ income: number; 
    incomePercentageChange: number; 
    expenses: number; 
    expensesPercentageChange: number; 
    remaining: number; 
    remainingPercentageChange: number; 
    transactionByDays: 
      { expenses: number; 
        income: number; 
        date: string; }[]; 
    } | undefined;
  isLoading:boolean
}


function Chart({data, isLoading}:ChartProps) {
  const [chartType, setChartType] = useState("bar")
  return (
    <Card className="grid col-span-1 lg:col-span-3 xl:col-span-4 rounded-md p-0">
      <CardHeader className="flex lg:flex-row justify-between items-center space-y-3 lg:space-y-0 pt-3 pl-4">
        <CardTitle className="text-xl text-blue-600">
          Transactions
        </CardTitle>
        <Select defaultValue={chartType} onValueChange={setChartType}>
          <SelectTrigger className="lg:w-32">
            <SelectValue placeholder="Chart Type" />
          </SelectTrigger>
          <SelectContent >
          <SelectItem value="area" >
              <div className="flex flex-row items-center">
                <AreaChart className="size-4 mr-1" />
                Area
              </div>
            </SelectItem>
            <SelectItem value="line" >
            <div className="flex flex-row items-center">
                <LineChart className="size-4 mr-1" />
                Line
              </div>
            </SelectItem>
            <SelectItem value="bar">
            <div className="flex flex-row items-center">
                <BarChart className="size-4 mr-1" />
                Bar
              </div>
            </SelectItem>
            
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-[350px] px-4">
        {chartType === "area" && <AreaVariant data={data?.transactionByDays}  /> }
        {chartType === "bar" && <BarVariant data={data?.transactionByDays}  /> }
        {chartType === "line" && <LineVariant data={data?.transactionByDays}  /> }
      </CardContent>
    </Card>
  )
}
export function ChartLoading() {
  return <Card className="grid col-span-1 lg:col-span-3 xl:col-span-4 rounded-md p-0">
    <CardHeader className="flex lg:flex-row justify-between items-center space-y-3 lg:space-y-0 pt-3 pl-4">
      <CardTitle>
        <Skeleton className="w-40 h-6" />
      </CardTitle>
      <Skeleton className="w-32 h-8" />
    </CardHeader>
    <CardContent className="h-[350px] flex justify-center items-center">
      <Loader2 className="size-6 animate-spin" />
    </CardContent>
  </Card>
}
export default Chart
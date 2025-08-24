import React, { useState } from 'react'
import { Loader2, PieChart, RadarIcon, Target } from "lucide-react"

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue } from "./ui/select";
import { Skeleton } from "./ui/skeleton";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle } from "./ui/card"
import RadarVariant from "./radar-variant";
import RadialVariant from "./radial-variant";
import PieVariant from "./pie-variant";


type SpendingPieProps = {
  data:{ 
    value:number,
    label:string
  } [] | undefined;
}

function SpendingPie({data}:SpendingPieProps ) {
  const [spendingPie, setSpendingPie] = useState("pie")
  const totalSpending = data?.reduce((acc, current) => acc = acc+current.value, 0) ?? 0;

  const modifiedData = data?.map((item) => {
    const modifiedValue = (item.value/totalSpending) * 100
    return {
      name:item.label,
      value:item.value,
      percentageValue:modifiedValue
    }
  })
  return (
    <Card className="grid col-span-1 lg:col-span-3 xl:col-span-2 rounded-md p-2">
      <CardHeader className="flex lg:flex-row justify-between items-center space-y-3 lg:space-y-0 pt-3 pl-4">
        <CardTitle className="text-xl text-blue-600">
          Expenses
        </CardTitle>
        <Select defaultValue={spendingPie} onValueChange={(value) => setSpendingPie(value)}>
          <SelectTrigger className="lg:w-32">
            <SelectValue placeholder="Chart Type" />
          </SelectTrigger>
          <SelectContent >
          <SelectItem value="pie" >
              <div className="flex flex-row items-center">
                <PieChart className="size-4 mr-1" />
                Pie
              </div>
            </SelectItem>
            <SelectItem value="radar" >
            <div className="flex flex-row items-center">
                <RadarIcon className="size-4 mr-1" />
                Radar
              </div>
            </SelectItem>
            <SelectItem value="radial">
            <div className="flex flex-row items-center">
                <Target className="size-4 mr-1" />
                Radial
              </div>
            </SelectItem>
            
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-[350px] px-4">
        {spendingPie === "pie" && <PieVariant data={modifiedData} /> }
        {spendingPie === "radar" && <RadarVariant data={modifiedData} /> }
        {spendingPie === "radial" && <RadialVariant data={modifiedData} /> }
      </CardContent>
    </Card>
  )
}

export function SpendingPieLoading() {
  return (
    <Card className="grid col-span-1 lg:col-span-3 xl:col-span-4 rounded-md p-0">
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
  )
}
export default SpendingPie
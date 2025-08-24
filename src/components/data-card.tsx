import React from 'react';
import { BoxIcon, LucideIcon } from "lucide-react";
import { cva, VariantProps } from "class-variance-authority";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "./ui/card";
import {CountUp} from "@/components/ui/count-up";
import { cn, formatPercentage } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

const iconVariant = cva(
  "size-8 rounded-md p-1",
  {
    variants:{
      variant:{
        default:"bg-blue-200 text-blue-700",
        success:"bg-emerald-200 text-emerald-700",
        warning:"bg-rose-200 text-rose-700"
      }
    },
    defaultVariants:{
      variant:"default"
    }
  },
)
type IconBoxType = VariantProps<typeof iconVariant>

interface DataCardProps extends IconBoxType  {
title:string;
Icon:LucideIcon;
value?:number;
percentageChangeValue?:number 
dateRange:string
}

 function DataCard({title, Icon, value=0, percentageChangeValue=0, variant, dateRange}:DataCardProps) {
  return (
    <Card className="border-none drop-shadow-sm ">
      
      <CardHeader className=" pt-4 space-y-1">
        <div className="flex flex-row justify-between items-center">
          <CardTitle className="text-blue-600 text-xl font-bold m-0">{title}</CardTitle>
          
          <Icon className={cn(iconVariant({variant}))}/>
          
        </div>
        <CardDescription className="text-blue-400 font-semibold text-xs ">
          {dateRange}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-1 ">
        <h1 className="text-xl font-bold">
        <CountUp 
          preserveValue
          start={0}
          end={value}
          duration={2}
          decimalPlaces={2}
          decimals={2}
          prefix="₹"
          />
        </h1>
        <p className={cn(
          "text-sm text-muted-foreground",
          percentageChangeValue > 0 && "text-emerald-400",
          percentageChangeValue < 0 && "text-rose-400"
        )}>
          {formatPercentage(percentageChangeValue,{addPrefix:true})} from last period</p>
      </CardContent>
      
    </Card>
  )
}

export const CardLoading = () => {
  return (
    <Card>
      <CardHeader className="pt-4 space-y-1">
        <div className="flex flex-row justify-between items-center">
        <CardTitle>
          <Skeleton className="w-36 h-6" />
        </CardTitle>
        <Skeleton className="size-9" />
        </div>
        <CardDescription >
          <Skeleton className="w-40 h-4" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-4 w-40" />
      </CardContent>
    </Card>
  )
}
export default DataCard
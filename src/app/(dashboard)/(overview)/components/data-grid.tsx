import React from 'react';
import {PiggyBank, TrendingDown, TrendingUp} from "lucide-react"
import DataCard, { CardLoading } from "@/components/data-card";
import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { useSearchParams } from "next/navigation";
import { formatDate } from "@/lib/utils";

type DataGridProps = {
isLoading:boolean
data:{
  income: number;
  incomePercentageChange: number;
  expenses: number;
  expensesPercentageChange: number;
  remaining: number;
  remainingPercentageChange: number;
} | undefined
}

function DataGrid({data, isLoading}:DataGridProps) {
  const params = useSearchParams();
  const from = params.get("from") || undefined;
  const to = params.get("to") || undefined;
  const dateRangeLable = formatDate({from, to});
  if(isLoading){
    return (
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CardLoading />
        <CardLoading />
        <CardLoading />
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <DataCard 
      title="Remaining"
      Icon={PiggyBank}
      value={data?.remaining}
      percentageChangeValue={data?.remainingPercentageChange}
      variant="default"
      dateRange={dateRangeLable}
      />
      <DataCard 
      title="Income"
      Icon={TrendingUp}
      value={data?.income}
      percentageChangeValue={data?.incomePercentageChange}
      variant="success"
      dateRange={dateRangeLable}
      />
      <DataCard 
      title="Expenses"
      Icon={TrendingDown}
      value={data?.expenses}
      percentageChangeValue={data?.expensesPercentageChange}
      variant="warning"
      dateRange={dateRangeLable}
      />
    </div>
  )
}

export default DataGrid
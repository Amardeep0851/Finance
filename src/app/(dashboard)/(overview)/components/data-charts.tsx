import React from 'react';
import { useSearchParams } from "next/navigation";

import Chart, {ChartLoading} from "@/components/chart";
import SpendingPie, {SpendingPieLoading} from "@/components/spending-pie";
import { useGetSummary } from "@/features/summary/api/use-get-summary";

function DataCharts() {

  const params = useSearchParams();
  
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

    const {data, isLoading} = useGetSummary(from, to, accountId);
    if(isLoading){
      return (
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-4">
          <ChartLoading />
          <SpendingPieLoading />
        </div>
      )
    }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 my-5 lg:space-x-5 space-y-4 lg:space-y-0">
      <Chart data={data} isLoading={isLoading} />
      <SpendingPie data={data?.finalCategories} />
    </div>
  )
}

export default DataCharts
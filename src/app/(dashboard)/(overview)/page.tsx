"use client"

import React from 'react';
import DataCharts from "@/app/(dashboard)/(overview)/components/data-charts";
import DataGrid from "@/app/(dashboard)/(overview)/components/data-grid";
import { useGetSummary } from "@/features/summary/api/use-get-summary";

function DashboardPage() {
  const {data, isLoading} = useGetSummary();
  return (
    <div className="-mt-24 mx-auto max-w-screen-2xl pb-10 w-full">
      <DataGrid data={data} isLoading={isLoading} />
      <DataCharts   />
    </div>
  )
}

export default DashboardPage
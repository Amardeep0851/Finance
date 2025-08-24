"use client"

import React from 'react';
import { useSearchParams } from "next/navigation";

import DataCharts from "@/app/(dashboard)/(overview)/components/data-charts";
import DataGrid from "@/app/(dashboard)/(overview)/components/data-grid";
import { useGetSummary } from "@/features/summary/api/use-get-summary";

function ClientPage() {
    const params = useSearchParams();
    
    const from = params.get("from") || "";
    const to = params.get("to") || "";
    const accountId = params.get("accountId") || "";
  const {data, isLoading} = useGetSummary(from, to, accountId);
  return (
    <div className="-mt-24 mx-auto max-w-screen-2xl pb-10 w-full">
        <DataGrid data={data} isLoading={isLoading} />
        <DataCharts   />
    </div>
  )
}

export default ClientPage
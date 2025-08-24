"use client"
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getClient } from "@/lib/hono";
import { useSearchParams } from "next/navigation";
import { convertAmountFromMiliUnits, formatPercentage } from "@/lib/utils";


export const useGetSummary = () => {
  const client = getClient()
  const params = useSearchParams();

  const from = params.get("from") || ""
  const to = params.get("to") || ""
  const accountId = params.get("accountId") || ""

  const query = useQuery({
    queryKey:["summary", from, to, accountId],
    queryFn:async () => {
      const response = await client.api.summary.$get({query:{from, to, accountId}});

      if(!response.ok){
        throw new Error("Something went wrong please try again.")
      }
      const {data} = await response.json();
      return {
        ...data,
        income:convertAmountFromMiliUnits(data.income),
        incomePercentageChange:data.incomePercentageChange,
        expenses:convertAmountFromMiliUnits(data.expenses),
        expensesPercentageChange:data.expensesPercentageChange,
        remaining:convertAmountFromMiliUnits(data.remaining),
        remainingPercentageChange:data.remainingPercentageChange,
        transactionByDays:(data.transactionByDays ?? []).map((item) => {
          return {
            ...item,
            expenses:convertAmountFromMiliUnits(Math.abs(item.expenses)),
            income:convertAmountFromMiliUnits(item.income)
          }
        } ),
        finalCategories:data.finalCategories.map((item) => {
          return {
            ...item,
          value:convertAmountFromMiliUnits(item.value)
          }
        })
      }
    }
  });
  return query
}
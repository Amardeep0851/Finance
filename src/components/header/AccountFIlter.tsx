"use client"
import React, { useState } from 'react';
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import qs from "query-string"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../ui/select";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useGetSummary } from "@/features/summary/api/use-get-summary";

function AccountFIlter() {
  const {data, isLoading:isLoadingAccout} = useGetAccounts();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

  const {isLoading:isLoadingSummary} = useGetSummary(from, to, accountId);

  const accountOptions = (data?.data || []).map((option) => ({
    label:option.name,
    value:option.id
  }))

  const onChangeSelect = (value:string) => {
    const query = {
      from:from,
      to:to,
      accountId:value
    }
    if(query.accountId === "all"){
      query.accountId = "";
    }
    const url = qs.stringifyUrl({
      url:pathname,
      query
    },{
      skipEmptyString:true,
      skipNull:true
    })
    router.push(url)
  }
  return (
    <Select onValueChange={onChangeSelect} disabled={isLoadingAccout || isLoadingSummary }>
      <SelectTrigger className=" w-full lg:w-40 focus:ring-0 focus:ring-offset-0 outline-none border-none bg-blue-100 hover:shadow-lg hover:text-black">
        <SelectValue className="" placeholder="Select Account" />
      </SelectTrigger>
      <SelectContent >
        <SelectItem value="all"> All </SelectItem>
        {accountOptions.map((option) => (
          <SelectItem className=" focus:bg-blue-200" value={option.value} key={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default AccountFIlter
"use client"
import React, { useState } from 'react'
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string"
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger
} from "@/components/ui/popover";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { format, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { formatDate } from "@/lib/utils";

import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";



function DateFilter() {
  
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const defaultTo = new Date()
  const defaultFrom = subDays(defaultTo, 30)

  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";
  
  const {isLoading:isLoadingSummary} = useGetSummary(from, to, accountId);
  const {isLoading:isLoadingTransactions} = useGetTransactions(from, to, accountId);
  

  const period = {
    from: from? new Date(from) : defaultFrom,
    to:to? new Date(to) : defaultTo
  }

  const onCancel = () => {
    setCalendarState(false)
  }
  const onApply = (date:DateRange | undefined) => {
    const from = format(date?.from || defaultFrom, "yyyy-MM-dd");
    const to = format(date?.to || defaultTo, "yyyy-MM-dd");;

    const query = {
      from,
      to,
      accountId
    }

    const url = qs.stringifyUrl({
      url:pathname,
      query
    },{
      skipEmptyString:true,
      skipNull:true
    });
    router.push(url)
    onCancel();
  }
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>(period)
  const [calendarState, setCalendarState] = useState(false)
  return (
    <div>
      <Popover open={calendarState} onOpenChange={setCalendarState} >
        <PopoverTrigger className="flex items-center text-blue-900" asChild>
          <Button
          className="bg-blue-100 hover:bg-blue-50"
          variant={"outline"}
          onClick={() =>setCalendarState(true)}
          > 
            <CalendarIcon className="size-8 text-blue-900" />
            {formatDate(selectedDate)}
            <ChevronDown className="size-8" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-white w-full ml-4 mt-2 border-2 lg:w-auto" align="end">
          <Calendar 
          mode="range"
          selected={selectedDate}
          onSelect={(value) => setSelectedDate(value)}
          numberOfMonths={2}
          initialFocus
          disabled={isLoadingSummary || isLoadingTransactions}
          />
          <div className="md:flex md:justify-end md:space-x-4">
            <Button
              variant="default"
              className="w-full md:w-auto"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
            variant="blue"
            className="w-full md:w-auto"
            onClick={() => onApply(selectedDate)}
            >
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DateFilter
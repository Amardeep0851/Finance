"use client"
import React, { useState } from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { 
  Popover, 
  PopoverTrigger, 
  PopoverContent 
} from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";

type DatePickerProps= {
value:Date;
onChange:(date: Date | undefined) => void;
disabled?:boolean;
}

function DatePicker({value, onChange, disabled}:DatePickerProps) {
  const [calendarState, setCalendarState] = useState(false)
  return (
    <div>
      <Popover open={calendarState} onOpenChange={setCalendarState}>
        <PopoverTrigger asChild>
          <Button 
          className={cn("text-left w-full font-normal px-3 justify-start border-[1px] border-zinc-200", !value && "text-muted-foreground", )} 
          variant="ghost" 
          disabled={disabled}>
            <CalendarIcon className="size-3" /> {value ? (<div> Selected date - {format(value, "PPP")}</div>) : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar 
          mode="single"
          selected={value}
          onSelect={(date) => {
            setCalendarState(false);
            onChange?.(date as Date | undefined)
          }}
          disabled={disabled}
          initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DatePicker
import { format } from "date-fns";
import React from 'react';

type CustomToolTip = {
  active:any;
  payload:any;
  label:any
}

function CustomToolTip({active, payload, label}:CustomToolTip) {
  if(!active && payload.length <=0){
    return null
  }
  return (
    <div className="bg-blue-200/70 pb-2  border-[1px] border-blue-400 shadow-sm rounded-sm overflow-hidden">
      <div className=" font-bold border-b-[1px] border-blue-300 pl-3 pr-4 pt-1  bg-blue-300">
        {format(payload[0]?.payload.date, "dd MMM, yyyy")}  
      </div> 

      <ul className="capitalize pl-3 pr-4 mt-1 space-y-1">
        <li className="flex flex-row items-center"> 
          <span className="h-2 w-2 mr-2 rounded-full bg-yellow-700"> </span>
          {payload[0]?.name}:{payload[0]?.payload.income}
        </li>
        <li  className="flex flex-row items-center ">
        <span className="h-2 w-2 mr-2 rounded-full bg-green-700"> </span>
          {payload[1]?.name}:{payload[0]?.payload.expenses}
        </li>
      </ul>
    </div>
  )
}

export default CustomToolTip
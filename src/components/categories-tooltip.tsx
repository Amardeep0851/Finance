import { formatPercentage } from "@/lib/utils";
import React from 'react'

function CategoriesTooltip({active, payload}:any) {
  if(!active) return null
  console.log(payload, active);
  return (
    <div className="bg-blue-200/90 pl-2 pr-3 py-1 text-sm">
      <div className="flex flex-row items-center space-x-2">
      
      <p className="font-bold capitalize">{payload[0].name}:</p> 
      <p className="">{payload[0].value} ({formatPercentage(payload[0].payload.percentageValue)})</p>
      </div>
        
    </div>
  )
}

export default CategoriesTooltip
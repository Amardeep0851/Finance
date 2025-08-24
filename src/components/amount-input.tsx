import React from 'react';
import CurrencyInput from "react-currency-input-field"
import { 
  Tooltip,
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger  
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { Info, MinusCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type AmountInputState= {
  value:string;
  onChange:(value:string | undefined ) => void;
  placeHolder:string;
  disabled:boolean;
}
function AmountInput({value, onChange, placeHolder, disabled}:AmountInputState) {
  const parsedValue = parseFloat(value);
  const isIncome = parsedValue > 0;
  const isExpenses = parsedValue < 0;

  const onReverse = () => {
    if(!value) return;
    onChange((parseFloat(value) * -1 ).toFixed(2).toString())
  }
  return (
    <div className="relative">
    <TooltipProvider delayDuration={50} >
    <Tooltip >
        <TooltipTrigger asChild>
          <Button 
          type="button" 
          className={cn("absolute left-1.5 top-1.5 bg-zinc-300 hover:bg-zinc-400 text-black", 
            isIncome && "bg-emerald-600 hover:bg-emerald-700 text-white",
            isExpenses && "bg-red-600 hover:bg-rose-700 text-white",
          )}
          onClick={onReverse}>
            {!parsedValue && <Info className="size-4" />}
            {isIncome && <PlusCircle className="size-4" />}
            {isExpenses && <MinusCircle className="size-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent className={cn(
          isIncome && "bg-emerald-700 ml-1",
          isExpenses && "bg-rose-700 ml-1",
          !parsedValue && "bg-slate-400 text-black"
        )}>
          [+] for income, [-] for expenses
        </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    <CurrencyInput
    
    className="w-full h-12 pl-16 text-black border-[1px] border-zinc-200 rounded-md focus-visible:outline-none hover:border-zinc-300 transition text-sm"
    onValueChange={onChange}
    value={value}
    placeholder={placeHolder}
    decimalsLimit={2}
    decimalScale={2}
    prefix="₹"
    disabled={disabled}
    />
    <div className="text-xs pt-1 text-zinc-400">[+] for income, [-] for expenses</div>
    </div>
  )
}

export default AmountInput

import React, { useState } from 'react'
import { InferResponseType } from "hono";
import {parse, format} from "date-fns"
import { ColumnDef } from "@tanstack/react-table";

import { getClient } from "@/lib/hono";
import { Checkbox } from "@/components/ui/checkbox";
import Actions from "./actions";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import AccountCell from "./account-cell";
import CategoryCell from "./category-cell";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency } from "@/lib/utils";

function getColumns() {

  const [sortingState, setSortingState] = useState()
  const client = getClient();
  type ResponseType = InferResponseType<typeof client.api.transactions.$get, 200>["data"]["0"]
  const columns:ColumnDef<ResponseType>[] =[
    {
      id:"Select",
      header:({table}) => (
        <Checkbox
        checked={table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected() && "indeterminate"}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        />
      ),
      cell:({row}) => (
        <Checkbox 
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        />
      ),
      enableHiding:false,
      enableSorting:false
     },
    {
      accessorKey:"payee",
      header:({column}) => (
        <Button variant="ghost" className="bg-transparent hover:bg-transparent  pl-0"
      onClick={() => { column.toggleSorting(column.getIsSorted() === "asc")}}>
        Payee
        <ArrowUpDown size="size-3" />
      </Button> )
    },
    {
      accessorKey:"account.name",
      header:({column}) => (
        <Button variant="ghost" 
        className="bg-transparent hover:bg-transparent pl-0"
      onClick={() => { column.toggleSorting(column.getIsSorted() === "asc")}} >
        Account
        <ArrowUpDown size="size-3" />
      </Button> ),
      cell:({row}) => <AccountCell id={row.original.id} name={row.original.account.name} />
    },
    {
      accessorKey:"categories.name",
      header:({column}) => (
        <Button variant="ghost" className="bg-transparent hover:bg-transparent pl-0"
      onClick={() => { column.toggleSorting(column.getIsSorted() === "asc")}}
      >
        Category
        <ArrowUpDown size="size-3" />
      </Button> ),
      cell:({row}) => <CategoryCell id={row.original.id} category={row.original.categories?.name ?? ""} categoryId={row.original.categoryId ?? " "}/>
    },
    {
      accessorKey:"amount",
      header:({column}) => (
        <Button variant="ghost" 
        className="bg-transparent hover:bg-transparent pl-0"
        onClick={() => { column.toggleSorting(column.getIsSorted() === "asc")}} >
        Amount
        <ArrowUpDown size="size-3" />
      </Button> ),
      cell:({row}) => {
        const parseAmount = parseFloat(row.getValue("amount"));
        return <Badge className={cn(
          parseAmount >0? "bg-emerald-500/20 hover:bg-emerald-600/20" : "bg-red-500/20 hover:bg-red-600/20", "text-black px-2 py-1 shadow-none"
        )}>
          {formatCurrency(parseAmount)}
        </Badge>
      }
    },
    {
      accessorKey:"date",
      header:({column}) => (<Button variant="ghost" 
        className="bg-transparent hover:bg-transparent pl-0"
        onClick={() => {column.toggleSorting(column.getIsSorted() === "asc")}}>
        Date
        <ArrowUpDown size="size-3" />
      </Button>),
      cell:({row}) => {
        const date = row.getValue("date") as Date
        const parseDate = format(date ,"dd MMMM y");
        return parseDate;
      }
    },
    {
      id:"action",
      header:"Action",
      cell:({row}) => <Actions id={row.original.id} />
    }
  ]
  return columns
}

export default getColumns
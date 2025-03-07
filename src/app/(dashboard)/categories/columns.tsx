"use client"
import React from 'react'
import { InferResponseType } from 'hono';
import { ColumnDef } from '@tanstack/react-table';

import { getClient } from "@/lib/hono";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Actions from "./actions";

export function columnsPage() {

  const client = getClient()
  type ResponseType = InferResponseType<typeof client.api.categories.$get, 200>["data"]["0"]

  const columns:ColumnDef<ResponseType>[] = [
   {
    id:"select",
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
    accessorKey:"name",
    header:({column}) => (
      <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="hover:bg-transparent px-0 text-zinc-800 hover:text-zinc-900"
      >
        Name 
        <ArrowUpDown className="size-3" />
      </Button>
    )
    },{
      id:"actions",
      header:"Actions",
      cell:({row}) => <Actions id={row.original.id} />
    }
  ]
  
  return columns
}



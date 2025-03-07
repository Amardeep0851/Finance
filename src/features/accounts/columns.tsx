import React from 'react';
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { InferResponseType } from "hono";

import { getClient } from "@/lib/hono";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Actions from "./Actions";

export const ColumnsPage = () =>{
  const client = getClient()
  type ResponseType = InferResponseType<typeof client.api.accounts.$get, 200>['data'][0]

  const columns:ColumnDef<ResponseType>[] = [
    {
      id:"Select",
      header:({table}) => {
        return <Checkbox 
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        />
      },
      cell:({row}) => (
        <Checkbox 
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey:"name",
      header:({column}) => (
        <Button 
        variant="ghost" 
        className="hover:bg-transparent ml-0 pl-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        > Name
          <ArrowUpDown/>
        </Button>
      )
    },
    {
      id:"Actions",
      header:"Actions",
      cell:({row}) => <Actions id={row.original.id} />
    }

  ];
  
  return columns;
}
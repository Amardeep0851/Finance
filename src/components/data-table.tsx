import React, { useState } from 'react';
import { 
  Row,
  flexRender,
  ColumnDef,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
  } from "@/components/ui/table";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useConfirm from "@/hooks/use-confirm";

interface DataTableProps<TData, TValue>{
  columns:ColumnDef<TData, TValue>[];
  data:TData[] ;
  filterKey:string;
  disabled?:boolean;
  onDelete:(rows:Row<TData>[]) => void
}

function DataTable<TData, TValue>({columns, data, filterKey, disabled, onDelete}:DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters ] = useState<ColumnFiltersState>([]);
  const [ConfirmDialog, confirm] = useConfirm("Confirm Bulk Delete","Are you sure? You are about to perform bulk delete");
  

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel:getCoreRowModel(),
    getPaginationRowModel:getPaginationRowModel(),
    getSortedRowModel:getSortedRowModel(),
    getFilteredRowModel:getFilteredRowModel(),
    onSortingChange:setSorting,
    onRowSelectionChange:setRowSelection,
    onColumnFiltersChange:setColumnFilters,
    state:{
      sorting,
      rowSelection,
      columnFilters
    }
  })
  return (
   <div className="space-y-4">

    <ConfirmDialog />
    
    {/* Input filter and button strcture start */}
    <div className="md:flex md:flex-row md:justify-between">
      <Input 
      value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn(filterKey)?.setFilterValue(event.target.value)
      }
      placeholder={`Filter ${filterKey}`}
      className="w-auto md:w-1/3"
      />
      {table.getFilteredSelectedRowModel().rows.length ? (
        <Button 
        size="sm"
        className="mt-4 md:mt-0 w-full md:w-auto"
        onClick={async () => {
        const ok = await confirm()
        if(ok){
          onDelete(table.getFilteredSelectedRowModel().rows);
          table.resetRowSelection();
        }
        }}
        disabled={disabled}
        >
        Delete {table.getFilteredSelectedRowModel().rows.length} 
        {table.getFilteredSelectedRowModel().rows.length > 1 ? " rows" : " row" }
      </Button>
      ) :(
        <Button 
        size="sm"
        disabled={!table.getFilteredSelectedRowModel().rows.length}
        className="mt-4 md:mt-0 w-full md:w-auto"
        >
        Delete 0 row
      </Button>
      )
    }
    </div>
    {/* Input filter and button strcture end */}

    {/* Here table structure is start */}
     <Table className="border-[1px] border-blue-200 rounded-md">
      <TableHeader className="bg-blue-100 rounded-t-md ">
        {table.getHeaderGroups().length && ( table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} >
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} 
              className={cn(
                "w-auto ",
                header.id === "Select" && "w-10", 
                header.id === "name" && "w-10/12", 
                header.id === "Actions" && "1/12"
                )}>
              {header.isPlaceholder
              ? null
            :flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}

        </TableRow>
        )))}
      </TableHeader>
      <TableBody className="space-y-2">
        {table.getRowModel().rows?.length 
        ? ( table.getRowModel().rows.map((row) => (
            <TableRow 
            key={row.id} 
            data-state={row.getIsSelected() && "Selected"}
            aria-disabled={disabled}
            className={cn("hover:bg-blue-50", row.getIsSelected() && "bg-zinc-100")}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))
          }
          </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center">
                No results.
              </TableCell>
          </TableRow>
        )
      }
      </TableBody>
    </Table>
    {/* Here table structure end */}

    {/* Pagination structure start */}
    <div className="space-x-3 flex justify-between">
    <div className="flex-1 text-sm text-muted-foreground ">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      <Button 
      variant="secondary"
      disabled={!table.getCanPreviousPage()} 
      onClick={() => table.previousPage()}
      className={cn(!table.getCanPreviousPage() && "cursor-not-allowed")}
      >
        Prevous
      </Button>

      <Button 
      variant="secondary"
      disabled={!table.getCanNextPage()}
      onClick={() => table.nextPage()}
      >
        Next
      </Button>
    </div>
    {/* Pagination structure end */}
   </div>
  )
}

export default DataTable
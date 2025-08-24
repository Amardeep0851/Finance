"use client"
import React from 'react';
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useNewTransactionSheet } from "@/features/transactions/hooks/use-new-transaction-sheet";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import DataTable from "@/components/data-table";
import GetColumns  from "./components/columns";
import { Button } from "@/components/ui/button";

function TransationPage() {
  const transactionQuery = useGetTransactions();
  const transactions = transactionQuery.data || []
  const columns = GetColumns();
  const {isOpen, onOpen} = useNewTransactionSheet()
  const bulkDeleteMutation = useBulkDeleteTransactions();

  const disabled = transactionQuery.isLoading

  if(transactionQuery.isLoading){
    return (
      <Card className="-mt-24 mx-auto max-w-screen-2xl pb-4 w-full">
        <CardHeader className="border-none drop-shadow-sm">
          <CardTitle className="text-center text-xl flex justify-center">
          <Skeleton className="h-8 w-48" />
          </CardTitle>
          <div className="flex justify-end ">
            <Skeleton className="h-8 w-40" />
          </div>
          <div className="flex justify-between pt-4">
          <Skeleton className="h-8 w-96" />
          <Skeleton className="h-8 w-40" />
          </div>
        </CardHeader>
        <CardContent className="h-[500px] flex justify-center items-center ">
          
          <Loader2 className="sie-6 animate-spin text-blue-500" />
        </CardContent>
      </Card>
    )
  }
  return (
   <Card className="-mt-24 mx-auto max-w-screen-2xl ">
    <CardHeader >
      <CardTitle className="text-2xl line-clamp-1 text-center">
        Transaction History
      </CardTitle>
      <div className="flex justify-end">
        <Button size="sm" onClick={onOpen}>
          New Transaction
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <DataTable 
      filterKey="payee"
      data={transactions}
      columns={columns}
      disabled={disabled}
      onDelete={(rows) => {
        const ids = rows.map((row) => row.original.id)
        bulkDeleteMutation.mutate({ids})
      }}
      
      />
    </CardContent>
   </Card>
  )
}

export default TransationPage
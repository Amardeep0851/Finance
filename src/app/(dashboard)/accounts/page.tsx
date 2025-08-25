"use client"

import React from 'react';
import { Loader2 } from "lucide-react";

import DataTable from "@/components/data-table";
import { ColumnsPage} from "@/features/accounts/columns";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewAccountSheet } from "@/features/accounts/store/useNewAccountSheet";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete-accounts";


function Page() {

  const {onOpen} = useNewAccountSheet();
  const columns = ColumnsPage()

  const accountsQuery = useGetAccounts();
  const accountsBulkDeleteMutation = useBulkDeleteAccounts();
  const accounts = accountsQuery.data?.data || [];
  const isDisable = accountsQuery.isLoading || accountsBulkDeleteMutation.isPending ;
  
  if(accountsQuery.isLoading){
    return (
      <div className="-mt-24 mx-auto max-w-screen-2xl w-full  pb-10">
        <Card className="drop-shadow-sm border-none">
        <CardHeader>
          <CardTitle className=" flex justify-center">
            <Skeleton className="h-8 w-48"  />
          </CardTitle>
          <div className="w-full flex justify-end" >
            <Skeleton className="md:w-36 h-10 w-full" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] flex justify-center items-center">
            <Loader2 className="size-6 animate-spin text-zinc-500 " />
          </div>
        </CardContent>
      </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto -mt-24 max-w-screen-2xl pb-4 w-full">
      <Card className="border-none drop-shadow-sm">
        <CardHeader>
          <CardTitle className="text-center text-xl line-clamp-1">
            Account page
          </CardTitle>
            <div className="flex flex-col lg:flex-row lg:justify-end lg:space-x-4 space-y-3 lg:space-y-0">
                  <Button type="button" size="sm" onClick={onOpen} >
                  New Account
                </Button>
                
                  </div>
        </CardHeader>
        <CardContent >
        <DataTable 
        columns={columns}
        data={accounts}
        filterKey="name"
        disabled={isDisable}
        onDelete={(rows) => {
          const ids = rows.map((row) => row.original.id);
          accountsBulkDeleteMutation.mutate({ids})
        }}
        />
        </CardContent>
      </Card>
    </div>
  )
}

export default Page
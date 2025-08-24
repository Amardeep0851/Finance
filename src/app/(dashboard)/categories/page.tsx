"use client"
import React from 'react'
import { z } from "zod"

import {columnsPage} from "./columns";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useGetCategories } from "@/features/categories/api/use-get-categories";
import {useNewCategorySheet } from "@/features/categories/hooks/use-new-category-sheet";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

function Page() {
  const columns = columnsPage();
  const categoriesQuery = useGetCategories();
  const bulkDeleteMutation = useBulkDeleteCategories();
  const categories = categoriesQuery.data || [];
  const {onOpen, onClose} = useNewCategorySheet();

  const isDisable = bulkDeleteMutation.isPending || categoriesQuery.isLoading
  if(categoriesQuery.isLoading){
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
    <div className="-mt-24 max-w-screen-2xl mx-auto pb-4 w-full">
      <Card className="border-none drop-shadow-sm">
        <CardHeader>
          <CardTitle className="text-center text-xl line-clamp-1">
            Categories page
          </CardTitle>
          <div className="flex justify-end">
            <Button 
            type="button"
            onClick={() => onOpen()}
            size="sm">New Category</Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable 
          columns={columns}
          data={categories}
          filterKey="name"
          disabled={isDisable}
          onDelete={(rows) => {
            const ids = rows.map((row) => row.original.id)
            bulkDeleteMutation.mutate({ids})
          }}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default Page
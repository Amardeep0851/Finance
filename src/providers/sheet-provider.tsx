"use client"
import React from 'react';
import { useMountedState } from "react-use";

import NewAccountSheet from "@/features/accounts/components/NewAccountSheet";
import EditAccountSheet from "@/features/accounts/components/EditAccountSheet";
import NewCategorySheet from "@/features/categories/components/NewCategorySheet";
import EditCategorySheet from "@/features/categories/components/EditCategorySheet";
import NewTransactionSheet from "@/features/transactions/components/new-transaction-sheet";
import EditTransactionSheet from "@/features/transactions/components/edit-transaction-sheet";
export default function SheetProvider() {

  const isMounted = useMountedState();
  if(!isMounted()){
    return null
  }
  return (
    <>
    <NewAccountSheet />
    <EditAccountSheet />

    <NewCategorySheet />
    <EditCategorySheet/>

    <NewTransactionSheet />
    <EditTransactionSheet />
    </>
  )
}
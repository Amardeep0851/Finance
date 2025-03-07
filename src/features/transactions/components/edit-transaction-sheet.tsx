import React from 'react';
import { z } from "zod";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

import TransactionForm from "./transaction-form";
import { useEditTransactionSheet } from "../hooks/use-edit-transaction-sheet";
import { useGetTransaction } from "../api/use-get-transaction";
import { useUpdateAccount } from "@/features/accounts/api/use-update-account";
import { useUpdateCategory } from "@/features/categories/api/use-update-category";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useGetAccount } from "@/features/accounts/api/use-get-account";
import { useUpdateTransaction } from "../api/use-update-transaction";
import { convertAmountFromMiliUnits, convertAmountToMiliUnits } from "@/lib/utils";


const formSchema = z.object({
  date:z.coerce.date(),
  amount:z.string(),
  payee:z.string(),
  notes:z.string().nullable().optional(),
  accountId:z.string(),
  categoryId:z.string().nullable().optional(),
});
type formValues = z.input<typeof formSchema>

function EditTransactionSheet() {
  const {isOpen, onClose, id} = useEditTransactionSheet()

  const categoriesQuery = useGetCategories();
  const accountsQuery = useGetAccounts();
  const transactionMutation = useUpdateTransaction(id );
  const accountMutation = useUpdateAccount(id);
  const categoryMutation = useUpdateCategory(id);
  const transactionQuery = useGetTransaction(id)
  
  const accountOptions = (accountsQuery.data?.data || []).map((option) => ({
    label:option.name,
    value:option.id
  }))
  const categoryOptions = (categoriesQuery.data || []).map((option) => ({
    label:option.name,
    value:option.id
  }));

  const defaultValues = transactionQuery.data ? {
    amount: convertAmountFromMiliUnits(transactionQuery.data.amount).toString(),
    date:transactionQuery.data.date ? new Date(transactionQuery.data.date) : new Date(),
    notes:transactionQuery.data.notes,    
    payee:transactionQuery.data.payee,
    categoryId:transactionQuery.data.categoryId,
    accountId:transactionQuery.data.accountId
  } : {
    amount:"",
    date: new Date(),
    notes:"",    
    payee:"",
    categoryId:"",
    accountId:""
  }

  const onCreateAccount = (name:string) => accountMutation.mutate({name});
  const onCreateCategory = (name:string) => categoryMutation.mutate({name});

  const onSubmit = (values:formValues) => {
    const parsedValue = parseFloat(values.amount);
    const valueInMillinUnits = convertAmountToMiliUnits(parsedValue)
    transactionMutation.mutate({
      ...values,
      amount:valueInMillinUnits
    }, {
      onSuccess:() => {
        onClose();
      }
    })
  }
  const isDiabled = categoriesQuery.isLoading || accountsQuery.isLoading || transactionQuery.isLoading || transactionMutation.isPending
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left"> 
        <SheetHeader>
        <SheetTitle>
          New Transaction
        </SheetTitle>
      </SheetHeader>
        <TransactionForm 
        onSubmit={onSubmit}
        onCreateCategory={onCreateCategory}
        onCreateAccount={onCreateAccount}
        accountOptions={accountOptions} 
        categoryOptions={categoryOptions}
        disabled={isDiabled}
        defaultValues={defaultValues}
        id={id}
        />
      </SheetContent>
    </Sheet>
  )
}

export default EditTransactionSheet
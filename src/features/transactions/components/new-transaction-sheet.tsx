import React from 'react';
import { z } from "zod";

import { useNewTransactionSheet } from "../hooks/use-new-transaction-sheet";
import { useCreateTransaction } from "../api/use-create-transaction";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateCategory } from "@/features/categories/api/use-create-category";


import AccountForm from "@/features/transactions/components/transaction-form";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";
import { convertAmountToMiliUnits } from "@/lib/utils";

const formSchema = z.object({
  amount:z.string(),
  date:z.coerce.date(),
  payee:z.string(),
  notes:z.string().nullable().optional(),
  categoryId:z.string().nullable().optional(),
  accountId:z.string()
})

type formValues = z.input<typeof formSchema>

function NewTransactionSheet() {
  const {isOpen, onClose} = useNewTransactionSheet();

  const accountsQuery = useGetAccounts();
  const accountMutation = useCreateAccount();
  const categoriesQuery = useGetCategories()
  const categoryMutation = useCreateCategory();
  const transactionMutation = useCreateTransaction();
  
  const accountOptions = (accountsQuery?.data?.data ?? []).map((account) => ({
    label: account.name,
    value: account.id
  }));
  const categoryOptions = (categoriesQuery?.data ?? []).map((account) => ({
    label: account.name,
    value: account.id
  }));

  const onCreateAccount = (name:string) => accountMutation.mutate({name});
  const onCreateCategory = (name:string) => categoryMutation.mutate({name});

  const onSubmit = (values:formValues) => {
    const amount = parseFloat(values.amount);
    const amountInMiliunits = convertAmountToMiliUnits(amount);
    transactionMutation.mutate({
      ...values,
      amount:amountInMiliunits
    }, { onSuccess:() => { onClose(); }
    })
  }
  const isDisabled = accountMutation.isPending || transactionMutation.isPending || categoryMutation.isPending ||  accountsQuery.isLoading || categoriesQuery.isLoading;

  const defaultValues = {
    amount:"",
    date:new Date(),
    notes:"",    
    payee:"",
    createId:"",
    accountId:""
  }
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="px-5 py-3"> 
        <SheetHeader>
        <SheetTitle className="text-center">
          Add New Transaction
        </SheetTitle>
        <SheetDescription className="pt-1 pb-3 text-justify">
        Add a new transaction into you history by filling following information.
        </SheetDescription>
      </SheetHeader>
        <AccountForm
         onSubmit={onSubmit}
         disabled={isDisabled}
         accountOptions={accountOptions}
         categoryOptions={categoryOptions}
         onCreateAccount={onCreateAccount}
         onCreateCategory={onCreateCategory}
         defaultValues={defaultValues}
        />
      </SheetContent>
    </Sheet>
  )
}

export default NewTransactionSheet
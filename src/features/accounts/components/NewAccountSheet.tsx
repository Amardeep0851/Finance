"use client"
import React from 'react'
import { z } from "zod";

import { Sheet, 
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription
 } from "@/components/ui/sheet";
import { useNewAccountSheet } from "../store/useNewAccountSheet";
import { useCreateAccount } from "../api/use-create-account";
import AccountForm from "./AccountForm";

const formSchema = z.object({
  name:z.string().min(1,{message:"Name is required."})
})

type FormValues = z.input<typeof formSchema>

function NewAccountSheet() {

  const {isOpen, onClose} =  useNewAccountSheet();
  const mutation = useCreateAccount();

  const onSubmit = (values:FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      }
    })
  }

  const disabled = mutation.isPending;

  return (
    <Sheet open={isOpen} onOpenChange={onClose} >
      <SheetContent className="p-0" side="left">
        <SheetHeader className="pt-4 px-4">
          <SheetTitle className="text-center text-xl border-b-[1px] border-zinc-300 pb-3 mb-3">            
            Create New Account            
          </SheetTitle>
          <SheetDescription>
            Create a new category to track your transactions
          </SheetDescription>
          
          <AccountForm 
            onSubmit={onSubmit}
            disabled={disabled}
            defaultValues={{
              name:""
            }}
            />
        
        </SheetHeader>                
      </SheetContent>
    </Sheet>
  )
}

export default NewAccountSheet
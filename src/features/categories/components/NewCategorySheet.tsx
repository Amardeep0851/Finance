import React from 'react'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useNewCategorySheet } from "../hooks/use-new-category-sheet";
import { useCreateCategory } from "../api/use-create-category";
import CategoryForm from "./CategoryForm";

const formSchema = z.object({
  name:z.string().min(1,{message:"Name is required."})
})

type formValues = z.input<typeof formSchema>

function NewCategorySheet() {

  const {isOpen, onOpen, onClose} = useNewCategorySheet();
  const createMutation = useCreateCategory()
  const isDisabled = createMutation.isPending;
 

  const handleSubmit = (values:formValues) => {
    createMutation.mutate(values, {
      onSuccess:() => {
        onClose();
      }
    })
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose} >
        <SheetContent side="left" className="p-0 px-4 space-y-3">
          <SheetHeader>
            <SheetTitle className="text-center border-b-[1px] pb-3 border-b-zinc-300 text-xl">
              Add new category
            </SheetTitle>
          </SheetHeader>
          <SheetDescription className="pt-2">
            Create a new category to track your transactions
          </SheetDescription>
            <CategoryForm
            onSubmit={handleSubmit}
            disabled={isDisabled}
            defaultValues={{
              name:""
            }}
            />
        </SheetContent>
      </Sheet>
    </>
  )
}

export default NewCategorySheet
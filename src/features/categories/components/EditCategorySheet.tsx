
import React from 'react'
import { z } from "zod";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useEditCategorySheet } from "../hooks/use-edit-category-sheet";
import { useUpdateCategory } from "../api/use-update-category";
import { useGetCategory } from "../api/use-get-category";
import { useDeleteCategory } from "../api/use-delete-category";
import useConfirm from "@/hooks/use-confirm";
import CategoryForm from "./CategoryForm";

const formSchema = z.object({
  name:z.string().min(1,{message:"Name is required."})
})

type formValues = z.input<typeof formSchema>

function EditCategorySheet() {

  const {isOpen, onClose, id} = useEditCategorySheet();
  const updateMutation = useUpdateCategory(id)
  const categoryQuery = useGetCategory(id)  
  const deleteMutation = useDeleteCategory(id);
  const isDisabled = updateMutation.isPending;

  const [ConfirmDialog, confirm] = useConfirm('Are you sure?',
    'You are about to delete this account.')

  const defaultValues = categoryQuery.data? {name:categoryQuery.data.name} : {name:""};

  const handleSubmit = (values:formValues) => {
    updateMutation.mutate(values, {
      onSuccess:() => {
        onClose();
      }
    })
  }

  const onDelete = async () => {
    const ok = await confirm();
    if(ok){
      deleteMutation.mutate(undefined, {
        onSuccess:() => {
          onClose();
        }
      });
     
    }
  }

  return (
    <>
    <ConfirmDialog />
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
            defaultValues={defaultValues}
            onDelete={onDelete}
            id={id}
            />
        </SheetContent>
      </Sheet>
    </>
  )
}

export default EditCategorySheet
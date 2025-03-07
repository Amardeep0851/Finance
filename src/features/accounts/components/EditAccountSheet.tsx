import React from 'react';
import { z } from "zod";

import useConfirm from "@/hooks/use-confirm";
import { useGetAccount } from "../api/use-get-account";
import useDeleteAccount from "../api/use-delete-account";
import { useUpdateAccount } from "../api/use-update-account";
import { useEditAccountSheet } from "../store/useEditAccountSheet";

import AccountForm from "./AccountForm";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const formSchema = z.object({
  name:z.string().min(1,{message:"Name is required."})
});
type FormValues = z.infer<typeof formSchema>;

function EditAccountSheet() {
  const {isOpen, onClose, id} = useEditAccountSheet();
  const accountQuery = useGetAccount(id)
  const deleteMutation = useDeleteAccount(id);
  const updateMutation = useUpdateAccount(id);

  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete this account.',
  );
  const defaultValues = accountQuery.data ? {name: accountQuery.data.name} : {name:""}
  const onSubmit = (values:FormValues) => {
    updateMutation.mutate(values,{
      onSuccess:() => {
        onClose();
      }
    })
  }
  const onDelete = async () => {
    const ok = await confirm();
    if(ok){
      deleteMutation.mutate();
      onClose();
    }
  }
  const disabled = accountQuery.isLoading || deleteMutation.isPending || updateMutation.isPending;

  return (
   <>
    <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-0">
          <SheetHeader className="text-center pt-3 px-4">
            <SheetTitle className="text-center text-xl border-b-[1px] border-zinc-300 pb-3 mb-3">
              Update Account Information
            </SheetTitle>
            <SheetDescription className="">
          Update or delete account information.
        </SheetDescription>
          </SheetHeader>
          <div className="p-4">
          <AccountForm 
          id={id}
          onSubmit={onSubmit}
          disabled={disabled}
          defaultValues={defaultValues}
          onDelete={onDelete}
          />
          </div>
        </SheetContent>
        
      </Sheet>
    </>
  )
}

export default EditAccountSheet
  "use client"
  import React from 'react';
  import { MoreVerticalIcon, Trash, Edit } from "lucide-react";

  import { 
    DropdownMenu, 
    DropdownMenuTrigger, 
    DropdownMenuItem, 
    DropdownMenuContent, 
    DropdownMenuLabel 
  } from "@radix-ui/react-dropdown-menu";
  import { Button } from "@/components/ui/button";
  import useConfirm from "@/hooks/use-confirm";
  import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";
  import { useEditTransactionSheet } from "@/features/transactions/hooks/use-edit-transaction-sheet";

  type props = {
    id:string
  }

  function Actions({id}:props) {

    const [ConfirmDialog, confirm] = useConfirm("Confirm Delete","Are you sure? You are about delete the item");
    const deleteTransactionMutation = useDeleteTransaction(id);
    const {onOpen} = useEditTransactionSheet()
    
    const handleDelete = async () => {
      const ok = await confirm();
      if(ok){
        deleteTransactionMutation.mutate()
      }
    }

    const handleEdit = () => {
      onOpen(id)
    }
    return (
      <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="bg-transparent">
          <Button variant="ghost" className=" hover:outline-none focus:outline-none focus:ring-0 focus:border-0 cursor-pointer hover:bg-transparent">
            <MoreVerticalIcon  className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          side="right" 
          align="end" 
          className="bg-zinc-50 px-2 pt-2 pb-2 mb-1 -ml-2 space-y-1 text-center transition rounded-md">
            <DropdownMenuItem 
              className="flex hover:outline-none cursor-pointer hover:bg-zinc-100 p-1 pr-3 rounded-md "
              onClick={handleEdit}>
                <Edit className="mr-2 size-4" />
                Edit
            </DropdownMenuItem>
            <DropdownMenuItem  
              className="flex hover:outline-none cursor-pointer hover:bg-zinc-100 p-1 pr-3 rounded-md"
              onClick={handleDelete}>
                <Trash className="mr-2 size-4" />
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </>
    )
  }

  export default Actions
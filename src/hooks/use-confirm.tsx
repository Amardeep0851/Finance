
import { Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogFooter,
 } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const useConfirm = (title:string, message:string):[() => JSX.Element, () => Promise<unknown>] => {

  const [promise, setPromise] = useState<{resolve:(value:boolean) => void} | null >(null)
  const confirm = () => new Promise((resolve, reject) => {
    setPromise({resolve})
  })

  const handleClose = () => {
    setPromise(null)
  }

  const handleCancel = () => {
    promise?.resolve(false)
    handleClose()
  }

  const handleConfirm = () => {
    promise?.resolve(true)
    handleClose()
  }

  const ConfirmDialog = () => (
    <Dialog open={promise !== null} onOpenChange={handleCancel}>
      <DialogContent className="p-0">
        <DialogHeader className="bg-blue-200 rounded-t-md">
          <DialogTitle className="text-left pt-3 pb-1 px-5 text-lg border-b-[1px] border-zinc-300">
            {title}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription 
        className="text-left text-base border-b-[0px] pb-1 pl-5">
          {message}
        </DialogDescription>
        <DialogFooter className="px-4 pb-2">
          <Button  
          onClick={handleCancel}
          size="sm"  > 
            Cancel 
          </Button>
          <Button 
          size="sm" 
          className="bg-red-800 hover:bg-red-900 mb-2 md:mb-0"
          onClick={handleConfirm}
          variant="destructive">
            Confirm
          </Button>
      </DialogFooter>
      </DialogContent>

    </Dialog>
  )
  return [ConfirmDialog, confirm]
}

export default useConfirm;
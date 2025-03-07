import {create} from "zustand";

type EditAccountSheetType = {
  id?:string;
  isOpen:boolean;
  onOpen:(id:string) => void
  onClose: () => void
}

export const useEditAccountSheet = create<EditAccountSheetType>((set) => ({
  id:undefined,
  isOpen:false,
  onOpen:(id:string) => set({isOpen:true, id}),
  onClose:() => set({isOpen:false})
}))
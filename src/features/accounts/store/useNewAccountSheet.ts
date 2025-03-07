import {create} from "zustand";

type NewAccountSheet = {
  isOpen:boolean;
  onOpen:() => void;
  onClose:() => void;
}

export const useNewAccountSheet = create<NewAccountSheet>((set) => ({
  isOpen:false,
  onOpen:() => set({isOpen:true}),
  onClose:() => set({isOpen:false})
}))
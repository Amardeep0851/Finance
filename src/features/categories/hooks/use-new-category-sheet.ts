import {create} from "zustand";

type CategorySheetState = {
  isOpen:boolean;
  onOpen:() => void;
  onClose:() => void;
}

export const useNewCategorySheet = create<CategorySheetState>((set) => ({
  isOpen:false,
  onOpen:() => set({isOpen:true}),
  onClose:() => set({isOpen:false})
}))
import { getClient } from "@/lib/hono"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export const useDeleteTransaction = (id:string) => {
  const client = getClient();
  const clientQuery = useQueryClient();

  const mutation = useMutation({
    
    mutationFn: async () => {
      const response = await client.api.transactions[":id"].$delete({ param:{ id } });
      if(!response.ok){
        throw new Error("Something went wrong.")
      }
      return await response.json();
  },
  onMutate:() => {
    toast.loading("Transaction is deleting...")
  },
  onSuccess:() => {
    toast.dismiss();
    toast.success("Transaction is deleted Successfully.");
    clientQuery.invalidateQueries({queryKey:["transactions"]})
  },
  onError:() => {
    toast.dismiss()
    toast.error("Something went wrong. Please try again.")
  }
})
  return mutation;
}
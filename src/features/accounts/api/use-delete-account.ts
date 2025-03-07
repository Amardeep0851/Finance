import { getClient } from "@/lib/hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const useDeleteAccount = (id?:string) => {

  const client = getClient();
  const clientQuery = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await client.api.accounts[":id"].$delete({
        param:{id}
      });
      return await response.json();
      
    },
    onMutate:() => {
      toast.loading("Account is deleting...")
    },
    onSuccess:() => {
      toast.dismiss();
      toast.success("Account is deleted.")
      clientQuery.invalidateQueries({queryKey:["accounts"]})
    },
    onError:() => {
      toast.error("Failed to delete Account. Please try again.")
    }
  })
  return mutation;
}

export default useDeleteAccount
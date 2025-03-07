import { getClient } from "@/lib/hono"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";


export const useDeleteCategory = (id?:string) => {
  console.log(id);
  const client = getClient();
  const queryClient = useQueryClient();
  
  type ResponseType = InferResponseType<typeof client.api.categories[':id']['$delete']>
  const mutation = useMutation<ResponseType, Error>({
    mutationFn:async () => {
      const response = await client.api.categories[":id"].$delete({
        param:{ id }
      });
      return await response.json();
    },
    onMutate:() => {
      toast.loading("Account is deleting...")
    },
    onSuccess:() => {
      toast.dismiss();
      toast.success("Account is deleted successfully.");
      queryClient.invalidateQueries({queryKey:["categories"]})
    },
    onError:() => {
      toast.error("Something went wrong. Please try again.")
    }
  });
  return mutation;
}
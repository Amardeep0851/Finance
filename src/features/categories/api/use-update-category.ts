import { getClient } from "@/lib/hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";


export const useUpdateCategory = (id?:string) => {

  const client = getClient();
  const queryClient = useQueryClient();

  type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$patch"]>
  type RequestType = InferRequestType<typeof client.api.categories[":id"]["$patch"]>["json"]
  
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn:async (json) => {
      const response = await client.api.categories[":id"].$patch({param:{
        id
      }, json})
      return await response.json()
    },
    onMutate:() => {
      toast.loading("Category is updating...")
    },
    onSuccess:() => {
      toast.dismiss();
      toast.success("Category is updated successfully.");
      queryClient.invalidateQueries({queryKey:["categories"]})
    },
    onError:() => {
      toast.error("Something went wrong. Please try again.")
    }
  });
  return mutation;
}
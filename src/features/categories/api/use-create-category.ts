import { getClient } from "@/lib/hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";


export const useCreateCategory = () => {

  const clientQuery = useQueryClient()
  const client = getClient();
  type ResponseType = InferResponseType<typeof client.api.categories.$post>
  type RequestType = InferRequestType<typeof client.api.categories.$post>["json"]

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn:async (json) => {
      const response = await client.api.categories.$post({ json });
      return await response.json()
    },
    onMutate:() => {
      toast.loading("Category is creating...")
    },
    onSuccess:() => {
      toast.dismiss();
      toast.success("Category is created successfully.")
      clientQuery.invalidateQueries({queryKey:["categories"]})
    },
    onError:() => {
      toast.error("Something went wrong. Please try again.")
    }
  })
  return mutation
}
import { InferRequestType, InferResponseType } from "hono";
import { getClient } from '@/lib/hono';
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useCreateTransaction = () => {
  const client = getClient();
  const queryClient = useQueryClient();

  type RequestType = InferRequestType<typeof client.api.transactions.$post>["json"]
  type ResponseType = InferResponseType<typeof client.api.transactions.$post>
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn:async (json) => {
      const response = await client.api.transactions.$post({ json });
      if(!response.ok){
        const error = await response.json()
        throw new Error(error.error || "Something went wrong")
      }
      return await response.json();
    },
    onSuccess:() => {
      toast.success("New transaction is added.");
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
    },
    onError:() => {
      toast.error("Something went wrong. Please try again.")
    }
  });
  return mutation
}
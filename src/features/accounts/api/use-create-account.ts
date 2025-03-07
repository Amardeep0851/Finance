import { toast } from 'sonner';
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { getClient } from "@/lib/hono";

export const useCreateAccount = () => {

  const queryClient = useQueryClient();
  const client = getClient();

  type ResponseType = InferResponseType<typeof client.api.accounts.$post>
  type RequestType = InferRequestType<typeof client.api.accounts.$post>['json']
  
const mutation = useMutation<ResponseType, Error, RequestType>({
  mutationFn:async (json) => {
    console.log("This is the json",json);
    const response = await client.api.accounts.$post({json});
    return await response.json();
  },
  onSuccess:() => {
    toast.success("Account is created successfully.");
    queryClient.invalidateQueries({queryKey:["accounts" ]});
  },
  onError: () => {
    toast.error("Something went wrong. Please try again.");
  }
});
return mutation;
}
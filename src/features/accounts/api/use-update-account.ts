import { toast } from 'sonner';
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { getClient } from "@/lib/hono";

export const useUpdateAccount = (id?:string) => {

  const queryClient = useQueryClient();
  const client = getClient();

  type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$patch"]>
  type RequestType = InferRequestType<typeof client.api.accounts[":id"]["$patch"]>['json']
  
const mutation = useMutation<ResponseType, Error, RequestType>({
  mutationFn:async (json) => {
    const response = await client.api.accounts[":id"].$patch({
      json,
      param: { id },
    });
    return await response.json();
  },
  onMutate:() => {
    toast.loading("Account name is updating...")
  },
  onSuccess:() => {
    toast.dismiss();
    toast.success("Account is updated successfully.");
    queryClient.invalidateQueries({queryKey:["accounts"]});
  },
  onError: () => {
    toast.dismiss()
    toast.error("Something went wrong. Please try again.");
  }
});
return mutation;
}
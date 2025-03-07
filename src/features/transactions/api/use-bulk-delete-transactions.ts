import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { getClient } from "@/lib/hono"

export const useBulkDeleteTransactions = () => {

  const client = getClient();
  const queryClient = useQueryClient();
  type RequestType = InferRequestType<typeof client.api.transactions["bulk-delete"]["$post"]>["json"];
  type ResponseType = InferResponseType<typeof client.api.transactions["bulk-delete"]["$post"]>

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn:async (json) => {
      const response = await client.api.transactions["bulk-delete"].$post({
        json
      });
      if (!response.ok) {
        throw new Error("Something went wrong.");
      }
      return await response.json()
    },
    onMutate:() => {
      toast.loading("transactions are deleting...");
    },
    onSuccess:() => {
      toast.dismiss();
      toast.success("transactions haved deleted successfully.");
      queryClient.invalidateQueries({queryKey:["transactions"]})
    },
    onError:() => {
      toast.dismiss();
      toast.error("Something went wrong. Please try again.");
    }
  });
  return mutation
}
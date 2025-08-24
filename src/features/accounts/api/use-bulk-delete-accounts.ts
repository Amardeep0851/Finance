import { toast } from "sonner";
import { getClient } from '@/lib/hono';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

export const useBulkDeleteAccounts = () => {
  const client = getClient();
  const queryClient = useQueryClient();

  type ResponseType = InferResponseType<typeof client.api.accounts["bulk-delete"]["$post"]>;
  type RequestType = InferRequestType<typeof client.api.accounts["bulk-delete"]["$post"]>["json"];

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts["bulk-delete"].$post({ json });
      return await response.json() as ResponseType;
    },
    onMutate: () => {
      const toastId = toast.loading("Deleting accounts...");
    },
    onSuccess: (data, variables, context) => {
      toast.dismiss();
      toast.success("Accounts deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: (error, variables, context) => {
      toast.dismiss();
      toast.error("Failed to delete accounts: " + error.message);
    },
  });

  return mutation;
};
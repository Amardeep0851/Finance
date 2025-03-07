import { toast } from "sonner";
import { getClient } from '@/lib/hono';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

export const useBulkDeleteCategories = () => {
  const client = getClient();
  const queryClient = useQueryClient();

  type ResponseType = InferResponseType<typeof client.api.categories["bulk-delete"]["$post"]>;
  type RequestType = InferRequestType<typeof client.api.categories["bulk-delete"]["$post"]>["json"];

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories["bulk-delete"].$post({ json });
      return await response.json();
    },
    onMutate: () => {
      const toastId = toast.loading("Deleting categories...");
    },
    onSuccess: (data) => {
      toast.dismiss();
      toast.success("categories deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      toast.dismiss();
      toast.error("Failed to delete categories: " + error.message);
    },
  });

  return mutation;
};
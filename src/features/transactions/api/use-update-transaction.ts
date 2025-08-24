
import { getClient } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export const useUpdateTransaction = (id?:string) => {
  const params = useSearchParams();
  const from  = params.get("from") ?? "";
  const to = params.get("to") ?? "";
  const accountId = params.get('accountId') || '';
  const client = getClient();
  const clientQuery = useQueryClient();
  type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$patch"]>;
  type RequestType = InferRequestType<typeof client.api.transactions[":id"]["$patch"]>["json"]
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn:async (json) => {
      const response = await client.api.transactions[":id"].$patch({
        param:{id},
        json
      });

      return await response.json();
    },
    onMutate:() => {
      toast.loading("Transaction is updating...")
    },
    onSuccess:() => {
      toast.dismiss();
      toast.success("Transaction is updated successfully.")
      clientQuery.invalidateQueries({queryKey:["transactions"]})
      clientQuery.invalidateQueries({queryKey:["transaction", id]})
      clientQuery.invalidateQueries({queryKey:["transactions", from, to, accountId]})
      clientQuery.invalidateQueries({queryKey:["summary"]})
    },
    onError:() => {
      toast.error("Something went wrong. Please try again.")
    }
  });
  return mutation
}
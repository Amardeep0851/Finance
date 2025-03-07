import { getClient } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query"


export const useGetTransaction = (id?:string) => {
  const client = getClient();
  const query = useQuery({
    queryKey:["transaction", id],
    queryFn:async () => {
      const response = await client.api.transactions[":id"].$get({ param:{ id } })
      if(!response.ok){
        throw new Error("Something went wrong, Please try again.")
      }
      const {data} = await response.json();
      return data;
    }
  });
  return query
}
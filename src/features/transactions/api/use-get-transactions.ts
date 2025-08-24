import { getClient } from "@/lib/hono"
import { useQuery } from "@tanstack/react-query";

export const useGetTransactions = (from:string, to:string, accountId:string) => {
  
  const client = getClient();

  const query = useQuery({
    queryKey:["transactions", from, to, accountId],
    queryFn:async () => {
      const response = await client.api.transactions.$get({ query:{ from, to, accountId } })
      if(!response.ok){
        throw new Error("Failed to fetch transactions. Please try again.")
      }
      const {data} = await response.json();
      console.log(data);
      return data
    }
  });
  return query;
}
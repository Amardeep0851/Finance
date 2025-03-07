import { getClient } from "@/lib/hono"
import { useMutation, useQuery } from "@tanstack/react-query";


export const useGetAccount = (id?:string) => {
  const client = getClient();
  const query = useQuery({
    queryKey:["accounts", id],
    queryFn:async () => {
      const response = await client.api.accounts[":id"].$get({
        param:{
          id
        }
      });
      if(!response.ok){
        throw new Error("Failed to fetch Account detail.")
      }
      
      const {data} = await response.json()
      return data
    }
  });
  return query;
}
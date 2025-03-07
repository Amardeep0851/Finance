import { useQuery } from "@tanstack/react-query";
import { getClient } from "@/lib/hono";


export const useGetCategories = () => {
  const client = getClient();
  const query = useQuery({
    queryKey:["categories"],
    queryFn:async () => {
      const response = await client.api.categories.$get();
      if(!response.ok){
        throw new Error("Failed to fetch categories")
      }
      const {data} = await response.json();
      return data
    }
  })
  return query
}
import {useQuery} from "@tanstack/react-query";

import { getClient } from '@/lib/hono';

export const useGetAccounts = () => {
  
  const client = getClient()

  const query = useQuery({
    queryKey:["accounts"],
    queryFn: async () => {
      const response = await client.api.accounts.$get();
          if (!response.ok) {
            throw new Error('Failed to fetch accounts');
          }
          const data  = await response.json();
          return data;
        }
    })
  return query;
};
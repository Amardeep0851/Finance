import { getClient } from "@/lib/hono";

export const useClient = () => {
  const client = getClient();
  return client;
};
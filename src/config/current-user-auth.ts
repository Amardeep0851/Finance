import {auth} from "@clerk/nextjs/server"

export const currentUserAuth = async (c:any) => {
  const userId = await auth();
  if (!userId) {
    return null;
  }
  return userId;
}
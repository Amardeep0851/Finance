import { hc } from 'hono/client';
import { AppType } from '@/app/api/[[...route]]/route';

export const getClient = () => {

  const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);

  return client;
};


// import { hc } from 'hono/client';
// import { AppType } from '@/app/api/[[...route]]/route';
// import { useAuth } from '@clerk/nextjs';

// export const getClient = () => {
//   const { getToken } = useAuth();

//   const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!, {
//     headers: async () => {
//       const token = await getToken();
//       return {
//         authorization: `Bearer ${token}`,
//       };
//     },
//   });

//   return client;
// };

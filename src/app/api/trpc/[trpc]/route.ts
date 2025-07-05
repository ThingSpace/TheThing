// app/api/trpc/[trpc]/route.ts
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@server/trpc/router/_app';
import { createContextApp } from '@server/trpc/context';
import { env } from '@env/server.mjs';

const handler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext: createContextApp, // Use the app router context
    onError:
      env.NODE_ENV === 'development'
        ? ({ type, path, input, error }) => {
            console.log('Error in', type, 'at', path, 'with input', input);
            console.error('Error details:', error);
          }
        : ({ error }) => {
            console.error('Error:', error);
            if (error.code === 'INTERNAL_SERVER_ERROR') {
              // Handle internal server errors
            }
          },
  });
};

export { handler as GET, handler as POST };
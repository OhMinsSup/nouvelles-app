import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import type { PrismaClient } from '@nouvelles/database';
import type { AppRouter } from '~/libs/trpc/router/root';

export { appRouter, type AppRouter } from '~/libs/trpc/router/root';
export { createTRPCContext } from '~/libs/trpc/trpc-core';

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export interface TRPCContext {
  session: Record<string, any> | null;
  db: PrismaClient;
}

import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";

/**
 * Shared backend actor accessor. Call at the top level of a hook, never
 * inside a query or mutation callback.
 */
export function useBackend() {
  return useActor(createActor);
}

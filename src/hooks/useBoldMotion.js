import { useFinePointer } from './useFinePointer';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Gate for every "signature" interaction — custom cursor, magnetic buttons,
 * spotlight glow. All three need a real pointer to mean anything and none of
 * them should run if the user has asked for reduced motion.
 *
 * Scroll reveals, page fades etc. use usePrefersReducedMotion directly since
 * they still make sense on touch; this hook is specifically for the pointer-
 * driven "bold" layer on top.
 */
export function useBoldMotion() {
  const finePointer = useFinePointer();
  const reduced = usePrefersReducedMotion();
  return finePointer && !reduced;
}

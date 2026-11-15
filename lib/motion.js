/**
 * Tiny shared store for per-frame motion values.
 *
 * The scroll-velocity effect writes `vel` and the hero portrait reads it, so
 * both stay in sync without re-rendering React on every animation frame.
 */
export const motionState = { vel: 0 };

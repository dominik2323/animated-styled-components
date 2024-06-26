export type Easing = [number, number, number, number];
export const easing: Easing = [0.0, 0.8, 0.515, 1.005];
export const easingAlt: Easing = [0.22, 1, 0.36, 1];

export const easingInOutCubic: Easing = [0.65, 0, 0.35, 1];

export const easingInOutCubicFn = (x: number): number => {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

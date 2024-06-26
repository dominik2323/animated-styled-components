"use client";

import { useInView } from "framer-motion";
import {
  StyledRevealAnimation,
  RevealAnimationInner,
} from "./Styles/StyledRevealAnimation";
import { type ReactNode, type CSSProperties, useRef } from "react";
import { easing } from "../animationConfig";
import React from "react";

export interface TextAnimationProps {
  children: ReactNode;
  delay?: number;
  noSkew?: boolean;
  noCrop?: boolean;
  duration?: number;
  disable?: boolean;
  y?: (number | string)[];
  as?: keyof JSX.IntrinsicElements;
  style?: CSSProperties;
  margin?: string;
  once?: boolean;
}

const RevealAnimation = ({
  children,
  delay = 0,
  noSkew = true,
  duration = 1.2,
  noCrop = false,
  disable,
  y,
  as,
  style,
  margin = "0% 0%",
  once = true,
}: TextAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin });

  return disable ? (
    <StyledRevealAnimation as={as} style={style}>
      {children}
    </StyledRevealAnimation>
  ) : (
    <StyledRevealAnimation
      ref={ref}
      style={{ overflow: noCrop ? "unset" : "hidden", ...style }}
      as={as}
    >
      <RevealAnimationInner
        animate={isInView ? "animate" : "initial"}
        initial='initial'
        variants={{
          initial: {
            y: y ? y[0] : "70%",
            skew: noSkew ? 0 : 20,
            opacity: 0.01,
          },
          animate: {
            y: y ? y[1] : "0%",
            skew: 0,
            opacity: 1,
          },
        }}
        transition={{ delay: 0.5 * delay, ease: easing, duration: duration }}
      >
        {children}
      </RevealAnimationInner>
    </StyledRevealAnimation>
  );
};

export default RevealAnimation;

import type { ReactNode } from "react";
import React from "react";
import originalStyled, { type Interpolation } from "styled-components";
import type { KnownTarget, Styles } from "styled-components/dist/types";
import RevealAnimation, {
  type TextAnimationProps,
} from "./RevealAnimation/RevealAnimation";
import { elementsSet, type SupportedHTMLElements } from "./domElements";

interface StyledRevealProps
  extends Partial<
    Omit<TextAnimationProps, "children" | "as" | "style" | "disable">
  > {
  children?: ReactNode;
  animated?: boolean;
  [key: string]: any;
}

const styledBaseReveal = (as: KnownTarget) => {
  const _StyledElement = originalStyled.span.attrs({ as });
  return (
    styles: Styles<object>,
    ...interpolations: Interpolation<object>[]
  ) => {
    const StyledElement = _StyledElement(styles, ...interpolations);
    const StyledReveal = ({
      children,
      animated = false,
      delay = 0,
      noSkew = true,
      duration = 1.2,
      noCrop = false,
      y,
      margin = "0% 0%",
      once = true,
      ...props
    }: StyledRevealProps) => {
      if (!animated) {
        return (
          <StyledElement as={as} {...props}>
            {children}
          </StyledElement>
        );
      }

      return (
        <RevealAnimation
          delay={delay}
          noSkew={noSkew}
          duration={duration}
          noCrop={noCrop}
          margin={margin}
          once={once}
          y={y}
        >
          <StyledElement as={as} {...props}>
            {children}
          </StyledElement>
        </RevealAnimation>
      );
    };

    StyledReveal.displayName = "StyledReveal";
    return StyledReveal;
  };
};

type StyledReveal = {
  [key in SupportedHTMLElements]: ReturnType<typeof styledBaseReveal>;
};

const styled = styledBaseReveal as typeof styledBaseReveal & StyledReveal;

elementsSet.forEach((el) => {
  styled[el] = styledBaseReveal(el);
});

export default styled;

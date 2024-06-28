import React from "react";
import originalStyled, {
  ServerStyleSheet,
  StyleSheetManager,
  createGlobalStyle,
  type StyledInstance,
  type SupportedHTMLElements,
} from "styled-components";
import type { WebTarget } from "styled-components/dist/types";
import RevealAnimation, { type TextAnimationProps } from "./RevealAnimation";
import { elementsSet } from "./domElements";

interface RevealComponentProps
  extends Omit<TextAnimationProps, "children" | "style"> {
  animated?: boolean;
  children?: React.ReactNode;
  [x: string]: any;
}

const StyledRevealFactory = <Target extends WebTarget>(tag: Target) => {
  const RevealComponent = ({
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
  }: RevealComponentProps) => {
    const el = React.createElement(tag, props, children);
    if (!animated) return el;

    return (
      <RevealAnimation
        delay={delay}
        noSkew={noSkew}
        duration={duration}
        noCrop={noCrop}
        y={y}
        margin={margin}
        once={once}
      >
        {el}
      </RevealAnimation>
    );
  };

  const displayName = typeof tag === "string" ? tag : tag.displayName;
  RevealComponent.displayName = `RevealComponent_${displayName}`;

  return originalStyled(RevealComponent);
};

type StyledRevealType = {
  [Key in SupportedHTMLElements]: StyledInstance<
    "web",
    Key,
    JSX.IntrinsicElements[Key] & RevealComponentProps
  >;
} & ReturnType<typeof StyledRevealFactory>;

let styled = StyledRevealFactory as StyledRevealType;

elementsSet.forEach((tag) => {
  styled[tag] = StyledRevealFactory<typeof tag>(tag);
});

export {
  ServerStyleSheet,
  StyleSheetManager,
  createGlobalStyle,
  type RevealComponentProps,
  type StyledRevealType,
  styled as default,
};

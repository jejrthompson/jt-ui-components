import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { assign } from "lodash";
import { CSSProperties, ReactNode, useMemo } from "react";
import { Button } from "react-bootstrap";

export interface IInputButtonProps {
  text?: ReactNode;
  icon?: IconProp;
  variant?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  href?: string;
  isLoading?: boolean;
  onClick?: () => void;
  size?: "lg" | "sm";
  style?: CSSProperties;
  target?: string;
  disabled?: boolean;
  inlineMarginTop?: boolean;
  title?: string;
}

export default function InputButton({
  className,
  disabled,
  href,
  icon,
  inlineMarginTop,
  isLoading,
  onClick,
  size,
  style,
  target,
  text,
  title,
  type = "button",
  variant = "primary",
}: IInputButtonProps) {
  const getIcon: IconProp | undefined = useMemo(() => {
    if (icon) return icon;

    switch (type) {
      case "submit":
        return "check";
      case "reset":
        return "rotate-left";
    }
  }, [icon, type]);

  return (
    <Button
      className={className}
      disabled={disabled || isLoading}
      href={href}
      onClick={onClick}
      size={size}
      style={inlineMarginTop ? assign({ marginTop: "32px" }, style) : style}
      target={target}
      type={type}
      variant={variant}
      title={title}
    >
      <div className="d-inline-block">
        {isLoading ? (
          <FontAwesomeIcon icon="circle-notch" spin />
        ) : (
          getIcon && <FontAwesomeIcon icon={getIcon} />
        )}
      </div>
      {text && <div className="ms-2 d-inline-block">{text}</div>}
    </Button>
  );
}

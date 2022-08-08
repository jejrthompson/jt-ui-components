import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { CSSProperties, ReactNode } from "react";
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
export default function InputButton({ className, disabled, href, icon, inlineMarginTop, isLoading, onClick, size, style, target, text, title, type, variant, }: IInputButtonProps): JSX.Element;

/// <reference types="react" />
export interface IInputTextProps {
    label: string;
    disabled?: boolean;
    required?: boolean;
    showLabel?: boolean;
    floatingLabel?: boolean;
    type: "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";
    min?: number;
    max?: number;
    step?: number;
}
export default function InputText({ label, disabled, required, floatingLabel, showLabel, }: IInputTextProps): JSX.Element;

/// <reference types="react" />
export interface IInputCheckProps {
    label: string;
    type?: "radio" | "checkbox" | "switch";
    disabled?: boolean;
    required?: boolean;
}
export default function InputCheck<T>({ label, type, disabled, required, }: IInputCheckProps): JSX.Element;

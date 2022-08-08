/// <reference types="react" />
export declare type IInputSelectOption = {
    value: string;
    label: string;
    disabled?: boolean;
} | string;
export interface IInputSelectProps {
    label: string;
    options: IInputSelectOption[] | undefined;
    disabled?: boolean;
    required?: boolean;
}
export default function InputSelect({ label, options, disabled, required, }: IInputSelectProps): JSX.Element;

/// <reference types="react" />
import { Option, TypeaheadState } from "react-bootstrap-typeahead/types/types";
declare type OptionType<T> = {
    _id: string;
} & T;
export interface IInputTypeaheadProps<T> {
    label: string;
    options: OptionType<T>[];
    idKey?: string;
    labelKey?: string;
    disabled?: boolean;
    required?: boolean;
    floatingLabel?: boolean;
    showLabel?: boolean;
    allowNew?: ((results: Array<Option>, props: TypeaheadState) => boolean) | boolean;
}
export default function InputTypeahead<T>({ label, disabled, idKey, labelKey, required, options, floatingLabel, showLabel, allowNew, }: IInputTypeaheadProps<T>): JSX.Element;
export {};

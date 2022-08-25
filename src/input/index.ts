import InputForm from "./form";
import InputFormListener from "./formListener";
import InputButton, { IInputButtonProps } from "./InputButton";
import InputCheck, { IInputCheckProps } from "./InputCheck";
import InputSelect, {
  IInputSelectOption,
  IInputSelectProps,
} from "./InputSelect";
import InputText, { IInputTextProps } from "./InputText";
import InputTypeahead, { IInputTypeaheadProps } from "./InputTypeahead";

interface IInputComponent {
  label: string;
  disabled?: boolean;
  required?: boolean;
}
export {
  InputButton,
  InputCheck,
  InputForm,
  InputFormListener,
  InputSelect,
  InputText,
  InputTypeahead,
};

export type {
  IInputComponent,
  IInputSelectOption,
  IInputSelectProps,
  IInputButtonProps,
  IInputCheckProps,
  IInputTextProps,
  IInputTypeaheadProps,
};

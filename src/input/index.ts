import InputForm from "./form";
import InputButton from "./InputButton";
import InputCheck from "./InputCheck";
import InputSelect from "./InputSelect";
import InputText from "./InputText";
import InputTypeahead from "./InputTypeahead";

interface IInputComponent {
  label: string;
  disabled?: boolean;
  required?: boolean;
}

export {
  InputButton,
  InputCheck,
  InputForm,
  InputSelect,
  InputText,
  InputTypeahead,
};

export type { IInputComponent };

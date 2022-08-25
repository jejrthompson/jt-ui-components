import { useFormikContext } from "formik";
import { useEffect } from "react";

interface IInputFormListenerProps<TForm> {
  onFormChange: (values: TForm, isValid: boolean) => void;
}

export default function InputFormListener<TForm>({
  onFormChange,
}: IInputFormListenerProps<TForm>) {
  const { values, isValid } = useFormikContext<TForm>();

  useEffect(() => {
    onFormChange(values, isValid);
  }, [isValid, onFormChange, values]);

  return null;
}

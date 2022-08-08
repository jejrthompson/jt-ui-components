import { Field, ErrorMessage, useFormikContext } from "formik";
import { camelCase, isString } from "lodash";
import { useCallback, useMemo } from "react";
import { Form } from "react-bootstrap";

export type IInputSelectOption =
  | {
      value: string;
      label: string;
      disabled?: boolean;
    }
  | string;

export interface IInputSelectProps {
  label: string;
  options: IInputSelectOption[] | undefined;
  disabled?: boolean;
  required?: boolean;
}

export default function InputSelect({
  label,
  options,
  disabled,
  required,
}: IInputSelectProps) {
  const { values, touched, errors } =
    useFormikContext<Record<string, string>>();

  const validate = useCallback(
    (value: string | number | undefined) => {
      if (required && (!value || value === undefined)) {
        return `${label} is required.`;
      }
    },
    [label, required]
  );

  const name = useMemo(() => camelCase(label), [label]);

  const camelCaseOption = useCallback((str: string) => camelCase(str), []);

  return (
    <Form.Group controlId={`form.${name}`}>
      <Form.Label>
        {label}:{required && <sup className="text-danger fw-bold">&nbsp;*</sup>}
      </Form.Label>
      <Field
        as={Form.Select}
        name={name}
        placeholder={label.replace(/[?:]/g, "")}
        disabled={disabled}
        validate={validate}
        required={required}
        isInvalid={errors[name]}
      >
        <option defaultValue={undefined}>Select one...</option>
        {options &&
          options.map((option, idx) =>
            isString(option) ? (
              <option
                key={camelCaseOption(option)}
                value={camelCaseOption(option)}
              >
                {option}
              </option>
            ) : (
              <option key={idx} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            )
          )}
      </Field>
      <ErrorMessage
        name={name}
        render={(msg) => (
          <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>
        )}
      />
    </Form.Group>
  );
}

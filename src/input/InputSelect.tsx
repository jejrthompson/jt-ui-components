import { Field, ErrorMessage, useFormikContext } from "formik";
import { camelCase, isObject, isString } from "lodash";
import { useCallback, useMemo } from "react";
import { Form } from "react-bootstrap";

import { IInputComponent } from ".";

export type IInputSelectOption =
  | {
      value: string | number;
      label: string;
      disabled?: boolean;
    }
  | string
  | number;

export interface IInputSelectProps extends IInputComponent {
  options?: IInputSelectOption[];
}

export default function InputSelect({
  label,
  options,
  disabled,
  required,
}: IInputSelectProps) {
  const { errors } = useFormikContext<Record<string, string>>();

  const validate = useCallback(
    (value: string | number | undefined) => {
      if (required && (!value || value === undefined)) {
        return `${label} is required.`;
      }
    },
    [label, required]
  );

  const name = useMemo(() => camelCase(label), [label]);

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
        {options?.map((option, idx) =>
          isObject(option) ? (
            <option key={idx} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ) : (
            <option
              key={idx}
              value={isString(option) ? camelCase(option) : option}
            >
              {option}
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

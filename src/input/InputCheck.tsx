import { Field, ErrorMessage, useFormikContext } from "formik";
import { camelCase } from "lodash";
import { useCallback, useEffect, useMemo } from "react";
import { Form } from "react-bootstrap";

export interface IInputCheckProps {
  label: string;
  type?: "radio" | "checkbox" | "switch";
  disabled?: boolean;
  required?: boolean;
}

export default function InputCheck<T>({
  label,
  type = "checkbox",
  disabled,
  required,
}: IInputCheckProps) {
  const { values, touched, errors } =
    useFormikContext<Record<string, boolean>>();

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
        {label}
        {required && <sup className="text-danger fw-bold">&nbsp;*</sup>}
      </Form.Label>
      <Field
        as={Form.Check}
        name={name}
        type={type}
        placeholder={label}
        disabled={disabled}
        validate={validate}
        required={required}
        isInvalid={errors[name]}
      />
      <ErrorMessage
        name={name}
        render={(msg) => (
          <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>
        )}
      />
    </Form.Group>
  );
}

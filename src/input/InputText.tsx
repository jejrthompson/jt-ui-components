import { Field, ErrorMessage, useFormikContext } from "formik";
import { camelCase } from "lodash";
import { useCallback, useMemo } from "react";
import { FloatingLabel, Form } from "react-bootstrap";

import { IInputComponent } from ".";

export interface IInputTextProps extends IInputComponent {
  showLabel?: boolean;
  floatingLabel?: boolean;
  type:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
  min?: number;
  max?: number;
  step?: number;
  readonly?: boolean;
}

export default function InputText({
  label,
  disabled,
  required,
  type,
  floatingLabel = false,
  showLabel = true,
  readonly = false,
}: IInputTextProps) {
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

  const fieldProps = useMemo(
    () => ({
      name,
      disabled,
      validate,
      readonly,
      required,
      type,
      as: Form.Control,
      placeholder: label.replace(/[?:]/g, ""),
      isInvalid: errors[name],
    }),
    [disabled, errors, label, name, readonly, required, type, validate]
  );

  return (
    <Form.Group controlId={`form.${name}`}>
      {floatingLabel ? (
        <FloatingLabel controlId={`floatingInput.${name}`} label={label}>
          <Field {...fieldProps} />
        </FloatingLabel>
      ) : (
        showLabel && (
          <Form.Label>
            {label}:
            {required && <sup className="text-danger fw-bold">&nbsp;*</sup>}
          </Form.Label>
        )
      )}
      {!floatingLabel && <Field {...fieldProps} />}
      <ErrorMessage
        name={name}
        render={(msg) => (
          <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>
        )}
      />
    </Form.Group>
  );
}

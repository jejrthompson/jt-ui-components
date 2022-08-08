import { ErrorMessage, Field, useFormikContext } from "formik";
import { camelCase, get, has } from "lodash";
import { useCallback, useMemo } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { Hint, Typeahead } from "react-bootstrap-typeahead";
import { TypeaheadComponentProps } from "react-bootstrap-typeahead/types/components/Typeahead";
import { Option, TypeaheadState } from "react-bootstrap-typeahead/types/types";

type OptionType<T> = { _id: string } & T;

export interface IInputTypeaheadProps<T> {
  label: string;
  options: OptionType<T>[];
  idKey?: string;
  labelKey?: string;
  disabled?: boolean;
  required?: boolean;
  floatingLabel?: boolean;
  showLabel?: boolean;
  allowNew?:
    | ((results: Array<Option>, props: TypeaheadState) => boolean)
    | boolean;
}

export default function InputTypeahead<T>({
  label,
  disabled,
  idKey = "id",
  labelKey,
  required,
  options,
  floatingLabel,
  showLabel = true,
  allowNew = true,
}: IInputTypeaheadProps<T>) {
  const { values, errors, handleChange, handleBlur } =
    useFormikContext<Record<string, T[]>>();

  const validate = useCallback(
    (value: string | number | undefined) =>
      required && (!value || value === undefined)
        ? `${label} is required.`
        : "",
    [label, required]
  );

  const name = useMemo(() => camelCase(label), [label]);

  const isInvalid = useMemo(
    () => has(errors, name) && get(errors, name) !== "",
    [errors, name]
  );

  const fieldProps: TypeaheadComponentProps = useMemo(
    () => ({
      allowNew,
      disabled,
      id: name,
      isInvalid,
      labelKey,
      name,
      onBlur: (e) => {
        e.target.name = name;
        return handleBlur(e);
      },
      onChange: (selected: Option[]) => {
        const [value] = selected;
        const e = {
          target: {
            name,
            value: get(value as OptionType<T>, idKey),
          },
        };
        handleChange(e);
      },
      options,
      placeholder: label,
      renderInput: floatingLabel
        ? ({ inputRef, referenceElementRef, value, ...inputProps }) => (
            <Hint>
              <FloatingLabel controlId="floatingLabel" label={label}>
                <Form.Control
                  {...inputProps}
                  ref={(node: HTMLInputElement) => {
                    inputRef(node);
                    referenceElementRef(node);
                  }}
                />
              </FloatingLabel>
            </Hint>
          )
        : undefined,
      required,
      selected: values.name,
      validate,
    }),
    [
      allowNew,
      disabled,
      floatingLabel,
      handleBlur,
      handleChange,
      idKey,
      isInvalid,
      label,
      labelKey,
      name,
      options,
      required,
      validate,
      values.name,
    ]
  );

  return (
    <Form.Group controlId={`form.${name}`}>
      {showLabel && (
        <Form.Label>
          {label}
          {required && <sup className="text-danger fw-bold">&nbsp;*</sup>}
        </Form.Label>
      )}
      <Field as={Typeahead} {...fieldProps} />
      <ErrorMessage
        name={name}
        render={(msg) => (
          <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>
        )}
      />
    </Form.Group>
  );
}

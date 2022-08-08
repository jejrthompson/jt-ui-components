import { Form as FormikForm, Formik, FormikConfig, FormikProps } from "formik";
import { isFunction, noop } from "lodash";
import { ReactElement, useMemo } from "react";
import { Form } from "react-bootstrap";

export type IInputFormValues<TForm> = Partial<
  Record<keyof TForm, string | number | boolean | Date | undefined>
>;

export interface IInputFormProps<TForm extends IInputFormValues<TForm>> {
  initialValues: TForm;
  onSubmit?: FormikConfig<TForm>["onSubmit"];
  validate: FormikConfig<TForm>["validate"];
  children?:
    | ReactElement
    | ((props: FormikProps<TForm>) => ReactElement | undefined);
}

export default function InputForm<TForm extends IInputFormValues<TForm>>({
  initialValues,
  onSubmit = noop,
  validate,
  children,
}: IInputFormProps<TForm>) {
  const formikProps: FormikConfig<TForm> = useMemo(
    () => ({ initialValues, onSubmit, validate }),
    [initialValues, onSubmit, validate]
  );

  return (
    <>
      <Formik<TForm> {...formikProps}>
        {(props) => (
          <Form as={FormikForm}>
            {isFunction(children) ? children(props) : children}
          </Form>
        )}
      </Formik>
    </>
  );
}

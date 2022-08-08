import { FormikConfig, FormikProps } from "formik";
import { ReactElement } from "react";
export declare type IInputFormValues<TForm> = Partial<Record<keyof TForm, string | number | boolean | Date | undefined>>;
export interface IInputFormProps<TForm extends IInputFormValues<TForm>> {
    initialValues: TForm;
    onSubmit?: FormikConfig<TForm>["onSubmit"];
    validate: FormikConfig<TForm>["validate"];
    children?: ReactElement | ((props: FormikProps<TForm>) => ReactElement | undefined);
}
export default function InputForm<TForm extends IInputFormValues<TForm>>({ initialValues, onSubmit, validate, children, }: IInputFormProps<TForm>): JSX.Element;

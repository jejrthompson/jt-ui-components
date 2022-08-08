import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { FormikHelpers, FormikProps } from "formik";
import { ReactNode } from "react";
import { ModalProps } from "react-bootstrap";
import { IInputFormProps, IInputFormValues } from "../input/form";
interface IModalInfo {
    type?: "info";
    okText?: string;
    okIcon?: FontAwesomeIconProps["icon"];
    body: ReactNode;
}
interface IModalAsk {
    type?: "ask";
    variant?: string;
    yesText?: string;
    yesIcon?: FontAwesomeIconProps["icon"];
    noText?: string;
    noIcon?: FontAwesomeIconProps["icon"];
    body: ReactNode;
    onConfirm?: (() => void) | (() => Promise<void>);
}
interface IModalSave<TForm extends IInputFormValues<TForm>> {
    type?: "save";
    saveText?: string;
    saveIcon?: FontAwesomeIconProps["icon"];
    cancelText?: string;
    cancelIcon?: FontAwesomeIconProps["icon"];
    initialValues: IInputFormProps<TForm>["initialValues"];
    validate: IInputFormProps<TForm>["validate"];
    body: ReactNode | ((formikProps: FormikProps<TForm>) => ReactNode);
    onSubmit?: ((values: TForm, formikHelpers: FormikHelpers<TForm>) => boolean) | ((values: TForm, formikHelpers: FormikHelpers<TForm>) => Promise<boolean>);
}
export declare type IModal<TForm extends IInputFormValues<TForm> = {}> = {
    type: "info" | "ask" | "save";
    title: string;
    icon?: FontAwesomeIconProps["icon"];
    isLoading?: boolean;
    size?: ModalProps["size"];
    onCancel?: () => void;
} & (IModalInfo | IModalAsk | IModalSave<TForm>);
export interface IModalRendererProps<TForm extends IInputFormValues<TForm>> {
    modal: IModal<TForm>;
    type?: "info" | "ask" | "save";
}
export default function ModalRenderer<TForm extends IInputFormValues<TForm>>({ modal, type, }: IModalRendererProps<TForm>): JSX.Element;
export {};

/// <reference types="react" />
import React, { ReactElement, ReactNode, CSSProperties } from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { FormikConfig, FormikProps, FormikHelpers } from 'formik';
import { ModalProps } from 'react-bootstrap';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Option, TypeaheadState } from 'react-bootstrap-typeahead/types/types';

declare type IInputFormValues<TForm> = Partial<Record<keyof TForm, string | number | boolean | Date | undefined>>;
interface IInputFormProps<TForm extends IInputFormValues<TForm>> {
    initialValues: TForm;
    onSubmit?: FormikConfig<TForm>["onSubmit"];
    validate: FormikConfig<TForm>["validate"];
    children?: ReactElement | ((props: FormikProps<TForm>) => ReactElement | undefined);
}
declare function InputForm<TForm extends IInputFormValues<TForm>>({ initialValues, onSubmit, validate, children, }: IInputFormProps<TForm>): JSX.Element;

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
declare type IModal<TForm extends IInputFormValues<TForm> = {}> = {
    type: "info" | "ask" | "save";
    title: string;
    icon?: FontAwesomeIconProps["icon"];
    isLoading?: boolean;
    size?: ModalProps["size"];
    onCancel?: () => void;
} & (IModalInfo | IModalAsk | IModalSave<TForm>);

interface IModalProviderProps {
    children: ReactNode;
}
interface IModalContext {
    save: <T>(t: IModal<T>) => void;
    ask: (t: IModal) => void;
    info: (t: IModal) => void;
    destroy: () => void;
}

interface IToast {
    title: string;
    body: ReactNode;
    bg?: string;
    delay?: number;
}

interface IToastrProviderProps {
    children: ReactNode;
}
interface IToastContext {
    push: (t: IToast) => void;
}

interface IInputButtonProps {
    text?: ReactNode;
    icon?: IconProp;
    variant?: string;
    type?: "button" | "submit" | "reset";
    className?: string;
    href?: string;
    isLoading?: boolean;
    onClick?: () => void;
    size?: "lg" | "sm";
    style?: CSSProperties;
    target?: string;
    disabled?: boolean;
    inlineMarginTop?: boolean;
    title?: string;
}
declare function InputButton({ className, disabled, href, icon, inlineMarginTop, isLoading, onClick, size, style, target, text, title, type, variant, }: IInputButtonProps): JSX.Element;

interface IInputCheckProps {
    label: string;
    type?: "radio" | "checkbox" | "switch";
    disabled?: boolean;
    required?: boolean;
}
declare function InputCheck<T>({ label, type, disabled, required, }: IInputCheckProps): JSX.Element;

declare type IInputSelectOption = {
    value: string;
    label: string;
    disabled?: boolean;
} | string;
interface IInputSelectProps {
    label: string;
    options: IInputSelectOption[] | undefined;
    disabled?: boolean;
    required?: boolean;
}
declare function InputSelect({ label, options, disabled, required, }: IInputSelectProps): JSX.Element;

interface IInputTextProps {
    label: string;
    disabled?: boolean;
    required?: boolean;
    showLabel?: boolean;
    floatingLabel?: boolean;
    type: "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";
    min?: number;
    max?: number;
    step?: number;
}
declare function InputText({ label, disabled, required, floatingLabel, showLabel, }: IInputTextProps): JSX.Element;

declare type OptionType<T> = {
    _id: string;
} & T;
interface IInputTypeaheadProps<T> {
    label: string;
    options: OptionType<T>[];
    idKey?: string;
    labelKey?: string;
    disabled?: boolean;
    required?: boolean;
    floatingLabel?: boolean;
    showLabel?: boolean;
    allowNew?: ((results: Array<Option>, props: TypeaheadState) => boolean) | boolean;
}
declare function InputTypeahead<T>({ label, disabled, idKey, labelKey, required, options, floatingLabel, showLabel, allowNew, }: IInputTypeaheadProps<T>): JSX.Element;

interface IItem {
    key: string;
    label: string;
    icon: FontAwesomeIconProps["icon"];
}
interface LayoutProps {
    logo: ReactNode;
    variant: "light" | "dark";
    items: IItem[];
    activeItem: string;
    children: JSX.Element;
    isAuthenticated?: boolean;
    menu?: JSX.Element;
    linkAs?: (item: IItem, children: ReactNode) => ReactNode;
}

declare const Form: {
    InputButton: typeof InputButton;
    InputCheck: typeof InputCheck;
    InputForm: typeof InputForm;
    InputSelect: typeof InputSelect;
    InputText: typeof InputText;
    InputTypeahead: typeof InputTypeahead;
};
declare const Modal: {
    ModalContext: React.Context<IModalContext>;
    ModalProvider: React.FC<IModalProviderProps>;
    useModal: () => IModalContext;
};
declare const Toast: {
    ToastrContext: React.Context<IToastContext>;
    ToastrProvider: React.FC<IToastrProviderProps>;
    useToastr: () => IToastContext;
};
declare const UI: {
    Layout: React.FC<LayoutProps>;
};

export { Form, Modal, Toast, UI };

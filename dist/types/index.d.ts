import React from "react";
import { IModalContext, IModalProviderProps } from "./context/modalContext";
import { IToastContext, IToastrProviderProps } from "./context/toastrContext";
import { InputButton, InputCheck, InputForm, InputSelect, InputText, InputTypeahead } from "./input";
import { LayoutProps } from "./ui";
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

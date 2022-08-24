import { config, library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faCircleNotch,
  faLightbulb,
  faQuestion,
  faSave,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Context, FC } from "react";

import {
  IModalContext,
  IModalProviderProps,
  ModalContext,
  ModalProvider,
  useModal,
} from "./context/modalContext";
import {
  IToastContext,
  IToastrProviderProps,
  ToastrContext,
  ToastrProvider,
  useToastr,
} from "./context/toastrContext";
import {
  InputButton,
  InputCheck,
  InputForm,
  InputSelect,
  InputText,
  InputTypeahead,
  IInputComponent,
  IInputSelectOption,
  IInputSelectProps,
  IInputButtonProps,
  IInputCheckProps,
  IInputTextProps,
  IInputTypeaheadProps,
} from "./input";
import { Layout, LayoutProps } from "./ui";

config.autoAddCss = false;
library.add(faCheck, faCircleNotch, faLightbulb, faQuestion, faSave, faXmark);

const Form = {
  InputButton,
  InputCheck,
  InputForm,
  InputSelect,
  InputText,
  InputTypeahead,
};

const Modal: {
  ModalContext: Context<IModalContext>;
  ModalProvider: FC<IModalProviderProps>;
  useModal: () => IModalContext;
} = { ModalContext, ModalProvider, useModal };

const Toast: {
  ToastrContext: Context<IToastContext>;
  ToastrProvider: FC<IToastrProviderProps>;
  useToastr: () => IToastContext;
} = { ToastrContext, ToastrProvider, useToastr };

const UI: {
  Layout: FC<LayoutProps>;
} = { Layout };

export { Form, Modal, Toast, UI };

export type {
  IInputComponent,
  IInputSelectOption,
  IInputSelectProps,
  IInputButtonProps,
  IInputCheckProps,
  IInputTextProps,
  IInputTypeaheadProps,
};

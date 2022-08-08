import { config, library } from "@fortawesome/fontawesome-svg-core";
import { faQuestion, faXmark } from "@fortawesome/free-solid-svg-icons";
import React from "react";

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
} from "./input";
import { Layout, LayoutProps } from "./ui";

config.autoAddCss = false;
library.add(faQuestion, faXmark);

const Form = {
  InputButton,
  InputCheck,
  InputForm,
  InputSelect,
  InputText,
  InputTypeahead,
};
const Modal: {
  ModalContext: React.Context<IModalContext>;
  ModalProvider: React.FC<IModalProviderProps>;
  useModal: () => IModalContext;
} = { ModalContext, ModalProvider, useModal };

const Toast: {
  ToastrContext: React.Context<IToastContext>;
  ToastrProvider: React.FC<IToastrProviderProps>;
  useToastr: () => IToastContext;
} = { ToastrContext, ToastrProvider, useToastr };

const UI: {
  Layout: React.FC<LayoutProps>;
} = { Layout };

export { Form, Modal, Toast, UI };

import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { FormikHelpers, FormikProps } from "formik";
import { isFunction } from "lodash";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { Modal, ModalProps } from "react-bootstrap";

import InputForm, { IInputFormProps, IInputFormValues } from "../input/form";
import InputButton, { IInputButtonProps } from "../input/InputButton";

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
  body: ReactNode | ((formikProps: FormikProps<TForm>) => ReactNode);
  validate?: IInputFormProps<TForm>["validate"];
  onSubmit?:
    | ((values: TForm, formikHelpers: FormikHelpers<TForm>) => boolean)
    | ((
        values: TForm,
        formikHelpers: FormikHelpers<TForm>
      ) => Promise<boolean>);
}

export type IModal<
  TForm extends IInputFormValues<TForm> = Partial<
    Record<never, string | number | boolean | Date | undefined>
  >
> = {
  type: "info" | "ask" | "save";
  title: string;
  icon?: FontAwesomeIconProps["icon"];
  isLoading?: boolean;
  size?: ModalProps["size"];
  onCancel?: () => void;
} & (IModalInfo | IModalAsk | IModalSave<TForm>);

interface IModalProperties {
  headerClassNames: string[];
  icon: FontAwesomeIconProps["icon"];
  buttons: IInputButtonProps[];
}

export interface IModalRendererProps<TForm extends IInputFormValues<TForm>> {
  modal: IModal<TForm>;
  // type?: "info" | "ask" | "save";
}

export default function ModalRenderer<TForm extends IInputFormValues<TForm>>({
  modal,
}: // type,
IModalRendererProps<TForm>) {
  const [show, setShow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setShow(!!modal);
  }, [modal]);

  const handleConfirm = useCallback(async () => {
    setIsLoading(true);
    if (modal?.type === "ask" && modal?.onConfirm) {
      await modal.onConfirm();
    }
    setShow(false);
    setIsLoading(false);
  }, [modal]);

  const handleSubmit = useCallback(
    async (values: TForm, formikHelpers: FormikHelpers<TForm>) => {
      setIsLoading(true);
      if (modal?.type === "save" && modal?.onSubmit) {
        const shouldClose = await modal.onSubmit(values, formikHelpers);
        if (shouldClose) {
          setShow(false);
        }
      }
      setIsLoading(false);
    },
    [modal]
  );

  const handleClose = useCallback(() => {
    setShow(false);
    if (modal?.onCancel) {
      modal.onCancel();
    }
  }, [modal]);

  const modalProps: IModalProperties = useMemo(() => {
    switch (modal.type) {
      case "info":
        return {
          headerClassNames: ["bg-info", "text-white"],
          icon: "info",
          buttons: [
            {
              text: modal.okText || "Ok",
              icon: modal.okIcon || "check",
              variant: "primary",
              onClick: handleClose,
            },
          ],
        };
      case "ask":
        return {
          headerClassNames: [
            `bg-${modal.variant || "secondary"}`,
            "text-white",
          ],
          icon: "question",
          buttons: [
            {
              text: modal.noText || "No",
              icon: modal.noIcon || "xmark",
              variant: "light",
              onClick: handleClose,
            },
            {
              type: "submit",
              text: modal.yesText || "Yes",
              icon: modal.yesIcon || "check",
              variant: "primary",
              onClick: handleConfirm,
              isLoading,
            },
          ],
        };
      case "save":
        return {
          headerClassNames: ["bg-secondary", "text-white"],
          icon: "save",
          buttons: [
            {
              text: modal.cancelText || "Cancel",
              icon: modal.cancelIcon || "xmark",
              variant: "light",
              onClick: handleClose,
            },
            {
              type: "submit",
              text: modal.saveText || "Save",
              icon: modal.saveIcon || "save",
              variant: "primary",
              isLoading,
            },
          ],
        };
      default:
        return {
          headerClassNames: [],
          icon: "info",
          buttons: [],
        };
    }
  }, [handleClose, handleConfirm, isLoading, modal]);

  const renderModalInner = useCallback(
    (formikProps?: FormikProps<TForm>) => (
      <>
        <Modal.Header
          className={modalProps.headerClassNames.join(" ")}
          closeVariant="white"
          closeButton
        >
          <Modal.Title>
            <FontAwesomeIcon
              icon={modal.icon ? modal.icon : modalProps.icon}
              className="me-3"
            />
            {modal.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formikProps &&
            (modal.type === "save"
              ? isFunction(modal.body)
                ? modal.body(formikProps)
                : modal.body
              : modal.body)}
        </Modal.Body>
        <Modal.Footer className="bg-light">
          {modalProps.buttons.map((button, idx) => (
            <InputButton key={idx} {...button} />
          ))}
        </Modal.Footer>
      </>
    ),
    [modal, modalProps.buttons, modalProps.headerClassNames, modalProps.icon]
  );

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size={modal.size}
      fullscreen="sm-down"
    >
      {modal.type === "save" ? (
        <InputForm<TForm>
          onSubmit={handleSubmit}
          initialValues={modal.initialValues}
          validate={modal.validate}
        >
          {renderModalInner}
        </InputForm>
      ) : (
        renderModalInner()
      )}
    </Modal>
  );
}

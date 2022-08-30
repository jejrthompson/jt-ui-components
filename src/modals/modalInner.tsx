import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormikProps } from "formik";
import { isFunction } from "lodash";
import { useCallback } from "react";
import { Modal } from "react-bootstrap";

import { IInputFormValues } from "../input/form";
import InputButton from "../input/InputButton";
import { IModal, IModalProperties } from "./modalRenderer";

interface IModalInnerPropsBase<TForm extends IInputFormValues<TForm>> {
  modal: IModal<TForm>;
  modalProps: IModalProperties;
  formikProps?: FormikProps<TForm>;
}

interface IModalInnerPropsSave<TForm extends IInputFormValues<TForm>>
  extends IModalInnerPropsBase<TForm> {
  formikProps: FormikProps<TForm>;
}

export type IModalInnerProps<TForm extends IInputFormValues<TForm>> =
  | IModalInnerPropsBase<TForm>
  | IModalInnerPropsSave<TForm>;

export default function ModalInner<TForm extends IInputFormValues<TForm>>(
  props: IModalInnerProps<TForm>
) {
  const renderModalBody = useCallback(() => {
    if (isFunction(props.modal.body)) {
      if (props.formikProps) {
        return props.modal.body(props.formikProps);
      }
      throw new Error("Formik Props not present.");
    }
    return props.modal.body;
  }, [props.formikProps, props.modal]);

  return (
    <>
      <Modal.Header
        className={props.modalProps.headerClassNames.join(" ")}
        closeVariant="white"
        closeButton
      >
        <Modal.Title>
          <FontAwesomeIcon
            icon={props.modal.icon ? props.modal.icon : props.modalProps.icon}
            className="me-3"
          />
          {props.modal.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderModalBody()}</Modal.Body>
      <Modal.Footer className="bg-light">
        {props.modalProps.buttons.map((button, idx) => (
          <InputButton key={idx} {...button} />
        ))}
      </Modal.Footer>
    </>
  );
}

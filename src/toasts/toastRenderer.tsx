import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isUndefined } from "lodash";
import moment from "moment";
import { ReactNode, useState } from "react";
import { Toast } from "react-bootstrap";

export interface IToast {
  title: string;
  body: ReactNode;
  bg?: string;
  delay?: number;
}

export default function ToastRenderer({ toast }: { toast: IToast }) {
  const [show, setShow] = useState(true);

  return (
    <Toast
      bg={toast.bg}
      onClose={() => setShow(false)}
      show={show}
      delay={!isUndefined(toast.delay) ? toast.delay : 4000}
      autohide={!isUndefined(toast.delay)}
    >
      <Toast.Header>
        <FontAwesomeIcon icon="lightbulb" className="me-2 text-warning" />
        <strong className="me-auto text-dark">{toast.title}</strong>
        <small className="text-muted">{moment().format("LT")}</small>
      </Toast.Header>
      <Toast.Body>{toast.body}</Toast.Body>
    </Toast>
  );
}

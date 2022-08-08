import { concat, noop } from "lodash";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { ToastContainer } from "react-bootstrap";

import ToastRenderer, { IToast } from "../toasts/toastRenderer";

interface IToastrProviderProps {
  children: ReactNode;
}

interface IToastContext {
  push: (t: IToast) => void;
}

const ToastrContext = createContext<IToastContext>({ push: noop });

const useToastr = () => useContext(ToastrContext);

function ToastrProvider({ children }: IToastrProviderProps) {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const updateToasts = useCallback((toast: IToast) => {
    setToasts((arr) => concat(arr, toast));
  }, []);

  return (
    <ToastrContext.Provider value={{ push: updateToasts }}>
      <ToastContainer
        style={{
          position: "fixed",
          top: "105px",
          right: "15px",
          zIndex: "999",
        }}
      >
        {toasts.map((toast, idx) => (
          <ToastRenderer key={idx} toast={toast} />
        ))}
      </ToastContainer>
      {children}
    </ToastrContext.Provider>
  );
}

export { ToastrContext, ToastrProvider, useToastr };
export type { IToastContext, IToastrProviderProps };

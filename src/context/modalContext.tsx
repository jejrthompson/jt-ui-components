import { assign, noop } from "lodash";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

import ModalRenderer, { IModal } from "../modals/modalRenderer";

interface IModalProviderProps {
  children: ReactNode;
}

interface IModalContext {
  save: <T>(t: IModal<T>) => void;
  ask: (t: IModal) => void;
  info: (t: IModal) => void;
  destroy: () => void;
}

const ModalContext = createContext<IModalContext>({
  save: noop,
  ask: noop,
  info: noop,
  destroy: noop,
});

const useModal = () => useContext(ModalContext);

function ModalProvider({ children }: IModalProviderProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [modal, setModal] = useState<IModal<any>>();

  const save: <T>(modal: IModal<T>) => void = useCallback((modal) => {
    setModal(assign({ type: "save" }, modal));
  }, []);

  const ask: (modal: IModal) => void = useCallback((modal) => {
    setModal(modal);
  }, []);

  const info: (modal: IModal) => void = useCallback((modal) => {
    setModal(modal);
  }, []);

  const destroy = useCallback(() => setModal(undefined), []);

  return (
    <ModalContext.Provider value={{ save, ask, info, destroy }}>
      {children}
      {modal && <ModalRenderer modal={modal} />}
    </ModalContext.Provider>
  );
}

export { ModalContext, ModalProvider, useModal };
export type { IModalContext, IModalProviderProps };

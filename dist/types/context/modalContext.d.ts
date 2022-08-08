import { ReactNode } from "react";
import { IModal } from "../modals/modalRenderer";
interface IModalProviderProps {
    children: ReactNode;
}
interface IModalContext {
    save: <T>(t: IModal<T>) => void;
    ask: (t: IModal) => void;
    info: (t: IModal) => void;
    destroy: () => void;
}
declare const ModalContext: import("react").Context<IModalContext>;
declare const useModal: () => IModalContext;
declare function ModalProvider({ children }: IModalProviderProps): JSX.Element;
export { ModalContext, ModalProvider, useModal };
export type { IModalContext, IModalProviderProps };

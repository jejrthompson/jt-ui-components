import { ReactNode } from "react";
import { IToast } from "../toasts/toastRenderer";
interface IToastrProviderProps {
    children: ReactNode;
}
interface IToastContext {
    push: (t: IToast) => void;
}
declare const ToastrContext: import("react").Context<IToastContext>;
declare const useToastr: () => IToastContext;
declare function ToastrProvider({ children }: IToastrProviderProps): JSX.Element;
export { ToastrContext, ToastrProvider, useToastr };
export type { IToastContext, IToastrProviderProps };

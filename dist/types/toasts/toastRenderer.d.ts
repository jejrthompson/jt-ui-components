import { ReactNode } from "react";
export interface IToast {
    title: string;
    body: ReactNode;
    bg?: string;
    delay?: number;
}
export default function ToastRenderer({ toast }: {
    toast: IToast;
}): JSX.Element;

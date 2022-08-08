import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { FC, ReactNode } from "react";
interface IItem {
    key: string;
    label: string;
    icon: FontAwesomeIconProps["icon"];
}
export interface LayoutProps {
    logo: ReactNode;
    variant: "light" | "dark";
    items: IItem[];
    activeItem: string;
    children: JSX.Element;
    isAuthenticated?: boolean;
    menu?: JSX.Element;
    linkAs?: (item: IItem, children: ReactNode) => ReactNode;
}
declare const Layout: FC<LayoutProps>;
export default Layout;

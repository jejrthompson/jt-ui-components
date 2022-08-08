import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { includes } from "lodash";
import { FC, ReactNode, useCallback, useState } from "react";
import {
  Col,
  Container,
  Nav,
  Navbar,
  Offcanvas,
  Row,
  Stack,
} from "react-bootstrap";

import styles from "./layout.module.scss";

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

const Layout: FC<LayoutProps> = ({
  children,
  items,
  activeItem,
  logo,
  linkAs,
  menu,
  isAuthenticated,
  variant,
}: LayoutProps) => {
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState(true);

  const isActive = useCallback(
    (key: string) => {
      if (activeItem) {
        if (key === "/") {
          return activeItem === "/" ? true : false;
        } else {
          return includes(activeItem, key);
        }
      }
    },
    [activeItem]
  );

  const renderNavLinkItem = useCallback(
    (item: IItem) => (
      <Nav.Link
        className={`${variant === "dark" ? "text-white" : ""} px-3 pe-xl-5`}
        active={isActive(item.key)}
      >
        <Stack direction="horizontal" gap={2}>
          <div className={styles["layout-sider-icon"]}>
            <FontAwesomeIcon icon={item.icon} size={expanded ? "1x" : "lg"} />
          </div>
          {expanded && <div>{item.label}</div>}
        </Stack>
      </Nav.Link>
    ),
    [expanded, isActive, variant]
  );

  const renderMenu = useCallback(
    (item: IItem) => (
      <Nav.Item key={item.key} className="mx-2 me-xl-4">
        {linkAs
          ? linkAs(item, renderNavLinkItem(item))
          : renderNavLinkItem(item)}
      </Nav.Item>
    ),
    [linkAs, renderNavLinkItem]
  );

  const OffcanvasHeader = useCallback(
    ({ children }: { children: ReactNode }) =>
      variant === "dark" ? (
        <Offcanvas.Header
          className={`bg-${variant} pe-4`}
          closeVariant="white"
          closeLabel="Close"
          closeButton
        >
          {children}
        </Offcanvas.Header>
      ) : (
        <Offcanvas.Header
          className={`bg-${variant} pe-4`}
          closeLabel="Close"
          closeButton
        >
          {children}
        </Offcanvas.Header>
      ),
    [variant]
  );

  return (
    <>
      <Navbar
        bg={variant}
        variant={variant}
        expand="xl"
        fixed="top"
        collapseOnSelect
        onToggle={setOpen}
        className={styles["layout-navbar"]}
      >
        <Container className={styles["layout-nav"]} fluid>
          <div id="toggle">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          </div>

          {isAuthenticated && (
            <Navbar.Offcanvas
              id="responsive-navbar-nav"
              aria-labelledby="responsive-navbar-nav-label"
              className={styles["layout-sider"]}
            >
              <OffcanvasHeader>
                <Offcanvas.Title id="responsive-navbar-nav-label">
                  {logo}
                </Offcanvas.Title>
              </OffcanvasHeader>
              <Offcanvas.Body className={`bg-${variant} min-vh-100`}>
                {isAuthenticated && (
                  <Nav
                    variant="pills"
                    className={"flex-column my-2 my-xl-3 w-100"}
                    navbarScroll
                  >
                    {items.map(renderMenu)}
                  </Nav>
                )}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          )}

          <div className="text-center">
            <Navbar.Brand href="/" className="pb-0 m-0">
              {logo}
            </Navbar.Brand>
          </div>
          {isAuthenticated ? <div className="text-end">{menu}</div> : <div />}
        </Container>
      </Navbar>
      {isAuthenticated ? (
        <Container fluid className={styles["layout-body-authd"]}>
          <Row className="flex-fill">
            <Col className="d-xl-block d-none" xl={2} />
            <Col className="p-3 pt-1 p-lg-4" xl={10}>
              {children}
            </Col>
          </Row>
        </Container>
      ) : (
        <Container className={styles["layout-body"]}>{children}</Container>
      )}
    </>
  );
};

export default Layout;

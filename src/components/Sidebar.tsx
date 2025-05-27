import { Card } from "@chakra-ui/react";
import { Filter, PanelRightClose, PanelRightOpen } from "lucide-react";
import { useCallback, useEffect, type RefObject } from "react";

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen?: (open: boolean) => void;
  sidebarRef: RefObject<HTMLDivElement | null>;
};

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const openSidebar = useCallback(() => {
    if (setSidebarOpen) {
      setSidebarOpen(true);
      localStorage.setItem("sidebarOpen", "true");
    }
  }, [setSidebarOpen]);

  const closeSidebar = useCallback(() => {
    if (setSidebarOpen) {
      setSidebarOpen(false);
      localStorage.setItem("sidebarOpen", "false");
    }
  }, [setSidebarOpen]);

  useEffect(() => {
    const storedSidebarOpen = localStorage.getItem("sidebarOpen");
    if (storedSidebarOpen === "true") {
      openSidebar();
    } else {
      closeSidebar();
    }
  }, [openSidebar, closeSidebar]);

  return (
    <>
      {sidebarOpen ? (
        <div className="wide-sidebar">
          <Card.Root className="sidebar-card">
            <Card.Header className="sidebar-header">
              <div className="sidebar-title">
                <PanelRightOpen
                  className="sidebar-icon"
                  onClick={closeSidebar}
                />
                <h2>Filter</h2>
              </div>
              <Filter className="sidebar-icon" />
            </Card.Header>
            <Card.Body className="sidebar-body"></Card.Body>
          </Card.Root>
        </div>
      ) : (
        <div className="narrow-sidebar">
          <Card.Root className="sidebar-card">
            <Card.Header className="sidebar-header">
              <div className="sidebar-title">
                <PanelRightClose
                  className="sidebar-icon panelRightClose"
                  onClick={openSidebar}
                />
              </div>
            </Card.Header>
            <Card.Body className="sidebar-body"></Card.Body>
          </Card.Root>
        </div>
      )}
    </>
  );
}

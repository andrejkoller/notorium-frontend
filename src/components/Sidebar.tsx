import { Button, Card } from "@chakra-ui/react";
import {
  Filter,
  Gauge,
  PanelRightClose,
  PanelRightOpen,
  Piano,
  Theater,
} from "lucide-react";
import { useCallback, useEffect, type RefObject } from "react";
import { Tooltip } from "./ui/tooltip";

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
            <Card.Body className="sidebar-body">
              <Tooltip
                content="Filter by instrument"
                positioning={{ placement: "bottom" }}
              >
                <Button variant={"outline"} className="instrument-button">
                  <Piano className="sidebar-icon" />
                  <span>Instrument</span>
                </Button>
              </Tooltip>
              <Tooltip
                content="Filter by genre"
                positioning={{ placement: "bottom" }}
              >
                <Button variant={"outline"} className="genre-button">
                  <Theater className="sidebar-icon" />
                  <span>Genre</span>
                </Button>
              </Tooltip>
              <Tooltip
                content="Filter by difficulty"
                positioning={{ placement: "bottom" }}
              >
                <Button variant={"outline"} className="difficulty-button">
                  <Gauge className="sidebar-icon" />
                  <span>Difficulty</span>
                </Button>
              </Tooltip>
            </Card.Body>
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
            <Card.Body className="sidebar-body">
              <Tooltip
                content="Filter by instrument"
                positioning={{ placement: "right" }}
              >
                <Button variant={"outline"} className="instrument-button">
                  <Piano className="sidebar-icon" />
                </Button>
              </Tooltip>
              <Tooltip
                content="Filter by genre"
                positioning={{ placement: "right" }}
              >
                <Button variant={"outline"} className="genre-button">
                  <Theater className="sidebar-icon" />
                </Button>
              </Tooltip>
              <Tooltip
                content="Filter by difficulty"
                positioning={{ placement: "right" }}
              >
                <Button variant={"outline"} className="difficulty-button">
                  <Gauge className="sidebar-icon" />
                </Button>
              </Tooltip>
            </Card.Body>
          </Card.Root>
        </div>
      )}
    </>
  );
}

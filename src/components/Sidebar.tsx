import { Button } from "@chakra-ui/react";
import {
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
        <div className="sidebar-wide">
          <div className="sidebar-header">
            <Tooltip
              content="Close sidebar"
              positioning={{ placement: "bottom" }}
            >
              <PanelRightOpen className="sidebar-icon" onClick={closeSidebar} />
            </Tooltip>
            <h1>Filter</h1>
          </div>
          <div className="sidebar-body">
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
          </div>
        </div>
      ) : (
        <div className="sidebar-narrow">
          <div className="sidebar-header">
            <Tooltip
              content="Open sidebar"
              positioning={{ placement: "right" }}
            >
              <PanelRightClose
                className="sidebar-icon panelRightClose"
                onClick={openSidebar}
              />
            </Tooltip>
          </div>
          <div className="sidebar-body">
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
          </div>
        </div>
      )}
    </>
  );
}

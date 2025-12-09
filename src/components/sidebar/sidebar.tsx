import { Button, Dialog, Portal } from "@chakra-ui/react";
import {
  Gauge,
  PanelRightClose,
  PanelRightOpen,
  Piano,
  Theater,
} from "lucide-react";
import { useCallback, useEffect, type RefObject } from "react";
import { Tooltip } from "../ui/tooltip";
import GenreDialog from "../dialogs/genre-dialog/genre-dialog";
import DifficultyDialog from "../dialogs/difficulty-dialog/difficulty-dialog";
import InstrumentDialog from "../dialogs/instrument-dialog/instrument-dialog";
import "./sidebar.css";

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen?: (open: boolean) => void;
  sidebarRef: RefObject<HTMLDivElement | null>;
};

function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        localStorage.setItem("sidebarOpen", "false");
        closeSidebar();
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [closeSidebar]);

  return (
    <div className="sidebar-container">
      {/* Instrument Filter Dialog */}
      <Dialog.Root size={"md"} modal={false}>
        {sidebarOpen ? (
          <div className="sidebar-wide">
            <div className="sidebar-header">
              <Tooltip
                content="Close sidebar"
                positioning={{ placement: "bottom" }}
              >
                <PanelRightOpen
                  className="sidebar-icon"
                  onClick={closeSidebar}
                />
              </Tooltip>
              <h1>Filter</h1>
            </div>
            <div className="sidebar-body">
              <Tooltip
                content="Filter by instrument"
                positioning={{ placement: "bottom" }}
              >
                <Dialog.Trigger asChild>
                  <Button variant={"outline"} className="instrument-button">
                    <Piano className="sidebar-icon" />
                    <span>Instrument</span>
                  </Button>
                </Dialog.Trigger>
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
                <Dialog.Trigger asChild>
                  <Button variant={"outline"} className="instrument-button">
                    <Piano className="sidebar-icon" />
                  </Button>
                </Dialog.Trigger>
              </Tooltip>
            </div>
          </div>
        )}
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <InstrumentDialog />
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {/* Genre Filter Dialog */}
      <Dialog.Root size={"md"} modal={false}>
        {sidebarOpen ? (
          <div className="sidebar-wide">
            <div className="sidebar-body">
              <Tooltip
                content="Filter by genre"
                positioning={{ placement: "bottom" }}
              >
                <Dialog.Trigger asChild>
                  <Button variant={"outline"} className="genre-button">
                    <Theater className="sidebar-icon" />
                    <span>Genre</span>
                  </Button>
                </Dialog.Trigger>
              </Tooltip>
            </div>
          </div>
        ) : (
          <div className="sidebar-narrow">
            <div className="sidebar-body">
              <Tooltip
                content="Filter by genre"
                positioning={{ placement: "right" }}
              >
                <Dialog.Trigger asChild>
                  <Button variant={"outline"} className="genre-button">
                    <Theater className="sidebar-icon" />
                  </Button>
                </Dialog.Trigger>
              </Tooltip>
            </div>
          </div>
        )}
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <GenreDialog />
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {/* Difficulty Filter Dialog */}
      <Dialog.Root size={"md"} modal={false}>
        {sidebarOpen ? (
          <div className="sidebar-wide">
            <div className="sidebar-body">
              <Tooltip
                content="Filter by difficulty"
                positioning={{ placement: "bottom" }}
              >
                <Dialog.Trigger asChild>
                  <Button variant={"outline"} className="difficulty-button">
                    <Gauge className="sidebar-icon" />
                    <span>Difficulty</span>
                  </Button>
                </Dialog.Trigger>
              </Tooltip>
            </div>
          </div>
        ) : (
          <div className="sidebar-narrow">
            <div className="sidebar-body">
              <Tooltip
                content="Filter by difficulty"
                positioning={{ placement: "right" }}
              >
                <Dialog.Trigger asChild>
                  <Button variant={"outline"} className="difficulty-button">
                    <Gauge className="sidebar-icon" />
                  </Button>
                </Dialog.Trigger>
              </Tooltip>
            </div>
          </div>
        )}
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <DifficultyDialog />
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </div>
  );
}

export default Sidebar;

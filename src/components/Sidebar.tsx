import { Card } from "@chakra-ui/react";
import { Filter, PanelRightOpen } from "lucide-react";

export default function Sidebar() {
  return (
    <Card.Root className="sidebar-card">
      <Card.Header className="sidebar-header">
        <div className="sidebar-title">
          <PanelRightOpen className="sidebar-icon" />
          <h2>Filter</h2>
        </div>
        <Filter className="sidebar-icon" />
      </Card.Header>
      <Card.Body className="sidebar-body"></Card.Body>
    </Card.Root>
  );
}

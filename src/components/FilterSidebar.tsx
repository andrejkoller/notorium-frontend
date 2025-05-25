import { Button } from "@chakra-ui/react";

export default function FilterSidebar() {
  return (
    <div className="filter-sidebar-container">
      <div className="filter-sidebar-content">
        <div className="filter-sidebar-header">
          <h1>Filters</h1>
        </div>
        <div className="filter-sidebar-body"></div>
        <div className="filter-sidebar-footer">
          <Button variant={"solid"} className="filter-apply-button" disabled>
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}

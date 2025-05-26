import { Card } from "@chakra-ui/react";
import { ThemeSwitcher } from "./theme/ThemeSwitcher";

export default function Settings() {
  return (
    <Card.Root className="settings-card">
      <Card.Header className="settings-header">
        <h1 className="settings-title">Settings</h1>
      </Card.Header>
      <Card.Body className="settings-body">
        <form className="settings-form">
          <div className="settings-field">
            <div className="settings-info">
              <label htmlFor="theme">Theme</label>
              <p className="settings-description">
                Choose your preferred theme for the application.
              </p>
            </div>
            <div className="settings-select">
              <ThemeSwitcher />
            </div>
          </div>
        </form>
      </Card.Body>
    </Card.Root>
  );
}

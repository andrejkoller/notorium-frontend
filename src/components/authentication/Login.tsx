import { Button, Card, Field, Input, Link } from "@chakra-ui/react";

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-content">
        <form className="login-form">
          <Card.Root className="login-card">
            <Card.Header className="login-card-header">
              <h2 className="login-card-title">Login</h2>
              <p className="login-card-description">
                Welcome back! Please enter your credentials.
              </p>
            </Card.Header>
            <Card.Body className="login-card-body">
              <div className="login-form-group">
                <Field.Root required>
                  <Field.Label>
                    Email <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </Field.Root>
              </div>
              <div className="login-form-group">
                <Field.Root required>
                  <Field.Label>
                    Password <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                  />
                </Field.Root>
              </div>
            </Card.Body>
            <Card.Footer className="login-card-footer">
              <div className="button-container">
                <Button
                  variant={"solid"}
                  type="submit"
                  className="login-form-button"
                >
                  Login
                </Button>
              </div>
              <div className="login-footer-links">
                <p>
                  Don't have an account?{" "}
                  <Link href="/register" className="register-link">
                    Register here
                  </Link>
                </p>
              </div>
            </Card.Footer>
          </Card.Root>
        </form>
      </div>
    </div>
  );
}

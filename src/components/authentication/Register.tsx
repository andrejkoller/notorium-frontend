import { Button, Card, Field, Input, Link } from "@chakra-ui/react";

export default function Register() {
  return (
    <div className="register-container">
      <div className="register-content">
        <form className="register-form">
          <Card.Root className="register-card">
            <Card.Header className="register-card-header">
              <h2 className="register-card-title">Register</h2>
              <p className="register-card-description">
                Create a new account to get started.
              </p>
            </Card.Header>
            <Card.Body className="register-card-body">
              <div className="register-form-group">
                <Field.Root required>
                  <Field.Label>
                    Name <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                  />
                </Field.Root>
              </div>
              <div className="register-form-group">
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
              <div className="register-form-group">
                <Field.Root required>
                  <Field.Label>
                    Username <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter a username"
                  />
                </Field.Root>
              </div>
              <div className="register-form-group">
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
            <Card.Footer className="register-card-footer">
              <div className="button-container">
                <Button
                  variant={"solid"}
                  type="submit"
                  className="register-form-button"
                >
                  Register
                </Button>
              </div>
              <div className="register-footer-links">
                <p>
                  Already have an account?{" "}
                  <Link href="/login" className="register-link">
                    Login here
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

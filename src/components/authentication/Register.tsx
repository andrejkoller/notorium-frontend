import { Button, Card, Field, Input, Link } from "@chakra-ui/react";
import { useState } from "react";
import { PasswordInput } from "../ui/password-input";
import { register } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { toaster } from "../ui/toaster";

export default function Register() {
  const MIN_PASSWORD_LENGTH = 8;

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password.length < MIN_PASSWORD_LENGTH) {
      setLoading(false);
      toaster.error({
        title: "Password too short",
        description: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
        duration: 5000,
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setLoading(false);
      toaster.error({
        title: "Password mismatch",
        description: "Passwords do not match.",
        duration: 5000,
      });
      return;
    }

    try {
      await register(
        formData.name,
        formData.email,
        formData.username,
        formData.password,
        formData.confirmPassword
      );

      navigate("/login");
      toaster.success({
        title: "Registration successful",
        description: "You can now log in.",
        duration: 5000,
      });
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        toaster.error({
          title: "Registration failed",
          description: err.message,
          duration: 5000,
        });
      } else {
        toaster.error({
          title: "Registration failed",
          description: "An unknown error occurred.",
          duration: 5000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-content">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <form className="register-form" onSubmit={handleSubmit}>
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
                      value={formData.name}
                      onChange={handleInputChange}
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
                      value={formData.email}
                      onChange={handleInputChange}
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
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Enter a username"
                    />
                  </Field.Root>
                </div>
                <div className="register-form-group">
                  <Field.Root required>
                    <Field.Label>
                      Password <Field.RequiredIndicator />
                    </Field.Label>
                    <PasswordInput
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                    />
                  </Field.Root>
                </div>
                <div className="register-form-group">
                  <Field.Root required>
                    <Field.Label>
                      Confirm Password <Field.RequiredIndicator />
                    </Field.Label>
                    <PasswordInput
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
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
        )}
      </div>
    </div>
  );
}

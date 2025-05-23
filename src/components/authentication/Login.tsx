import { Button, Card, Field, Input, Link } from "@chakra-ui/react";
import { useState } from "react";
import { login } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { toaster } from "../ui/toaster";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    try {
      const data = await login(formData.email, formData.password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
      toaster.success({
        title: "Login successful",
        description: "Welcome back!",
        duration: 5000,
      });
    } catch (err) {
      if (err instanceof Error) {
        setLoading(false);
        toaster.error({
          title: "Login failed",
          description: err.message,
          duration: 5000,
        });
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
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
                      value={formData.email}
                      onChange={handleInputChange}
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
                      value={formData.password}
                      onChange={handleInputChange}
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
        )}
      </div>
    </div>
  );
}

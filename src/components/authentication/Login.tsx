import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { login } from "../../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { toaster } from "../ui/toaster";
import { ComponentHeader } from "../ComponentHeader";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const isFormValid =
    formData.email.trim() !== "" && formData.password.trim() !== "";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
      <ComponentHeader />
      <div className="login-content">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-instructions-title">
              <h2 className="login-instructions-text">Login</h2>
              <p>Welcome back! Please enter your credentials.</p>
            </div>
            <div className="login-email-container">
              <div className="login-email-label">
                <label htmlFor="email" className="login-email-label-text">
                  Email
                </label>
              </div>
              <div className="login-email-input-container">
                <Input
                  placeholder="e. g. andrejkoller@outlook.com"
                  variant={"outline"}
                  size={"lg"}
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="login-email-input"
                />
              </div>
            </div>
            <div className="login-password-container">
              <div className="login-password-label">
                <label htmlFor="password" className="login-password-label-text">
                  Password
                </label>
              </div>
              <div className="login-password-input-container">
                <Input
                  placeholder="Enter your password"
                  variant={"outline"}
                  size={"lg"}
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="login-password-input"
                />
              </div>
            </div>
            <div className="button-container">
              <Button
                type="submit"
                variant={"solid"}
                size={"lg"}
                className="login-button"
                disabled={!isFormValid || loading}
              >
                Login
              </Button>
            </div>
            <div className="login-footer">
              <p className="login-footer-text">
                Don't have an account?{" "}
                <Link to={"/register"} className="login-footer-link">
                  Register here
                </Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

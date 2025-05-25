import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { PasswordInput } from "../ui/password-input";
import { register } from "../../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { toaster } from "../ui/toaster";
import { ComponentHeader } from "../ComponentHeader";

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

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.username.trim() !== "" &&
    formData.password.trim() !== "" &&
    formData.confirmPassword.trim() !== "";

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
      <ComponentHeader />
      <div className="register-content">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-instructions-title">
              <h2 className="register-instructions-text">Register</h2>
              <p>Create a new account to get started.</p>
            </div>
            <div className="register-name-container">
              <div className="register-name-label">
                <label htmlFor="name" className="register-name-label-text">
                  Name
                </label>
              </div>
              <div className="register-name-input-container">
                <Input
                  placeholder="e. g. Andrej Koller"
                  variant={"outline"}
                  size={"lg"}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="login-name-input"
                />
              </div>
            </div>
            <div className="register-email-container">
              <div className="register-email-label">
                <label htmlFor="email" className="register-email-label-text">
                  Email
                </label>
              </div>
              <div className="register-email-input-container">
                <Input
                  placeholder="e. g. andrejkoller@outlook.com"
                  variant={"outline"}
                  size={"lg"}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="register-email-input"
                />
              </div>
            </div>
            <div className="register-username-container">
              <div className="register-username-label">
                <label
                  htmlFor="username"
                  className="register-username-label-text"
                >
                  Username
                </label>
              </div>
              <div className="register-username-input-container">
                <Input
                  placeholder="e. g. andrejkoller"
                  variant={"outline"}
                  size={"lg"}
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="register-username-input"
                />
              </div>
            </div>
            <div className="register-password-container">
              <div className="register-password-label">
                <label
                  htmlFor="password"
                  className="register-password-label-text"
                >
                  Password
                </label>
              </div>
              <div className="register-password-input-container">
                <PasswordInput
                  placeholder="Enter your password"
                  variant={"outline"}
                  size={"lg"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="register-password-input"
                />
              </div>
            </div>
            <div className="register-confirm-password-container">
              <div className="register-confirm-password-label">
                <label
                  htmlFor="confirmPassword"
                  className="register-confirm-password-label-text"
                >
                  Confirm Password
                </label>
              </div>
              <div className="register-confirm-password-input-container">
                <PasswordInput
                  placeholder="Confirm your password"
                  variant={"outline"}
                  size={"lg"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="register-confirm-password-input"
                />
              </div>
            </div>
            <div className="button-container">
              <Button
                type="submit"
                variant={"solid"}
                size={"lg"}
                className="register-button"
                loadingText="Registering"
                disabled={!isFormValid || loading}
              >
                Register
              </Button>
            </div>
            <div className="register-footer">
              <p className="register-footer-text">
                Already have an account?{" "}
                <Link to={"/login"} className="register-footer-link">
                  Login here
                </Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

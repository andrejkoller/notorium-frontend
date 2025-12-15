import { Button, Input, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { PasswordInput } from "../../ui/password-input";
import { register } from "../../../services/auth-service";
import { Link, useNavigate } from "react-router-dom";
import { toaster } from "../../ui/toaster";
import "./signup.css";

function SignUp() {
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
      toaster.success({
        title: "Registration successful",
        description: "You can now log in.",
        duration: 5000,
      });
      setLoading(false);
      setTimeout(() => navigate("/login"), 1000);
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
    <div className="signup-container">
      <div className="signup-content">
        <div className="signup-header">
          <h1 className="signup-title">Create an Account</h1>
          <p className="signup-subtitle">
            Please enter your details to sign up.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-wrapper">
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <Input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <PasswordInput
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <Button variant={"solid"} type="submit" disabled={!isFormValid}>
            {loading ? <Spinner size="sm" /> : "Sign Up"}
          </Button>
        </form>
        <p className="signup-login-link">
          Already have an account?{" "}
          <Link to="/login" className="signup-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;

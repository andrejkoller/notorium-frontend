import { Button, Input, Spinner, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { login } from "../../../services/auth-service";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toaster } from "../../ui/toaster";
import { useCurrentUserContext } from "../../../hooks/use-current-user";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const { setCurrentUser } = useCurrentUserContext();

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
      setCurrentUser(data.user);
      setLoading(false);
      navigate("/");
      toaster.success({
        title: "Login successful",
        description: "You are now logged in.",
        duration: 2000,
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
    <>
      {loading ? (
        <VStack colorPalette="teal">
          <Spinner color="colorPalette.600" />
          <Text>Loading...</Text>
        </VStack>
      ) : (
        <div className="login-container">
          <div className="login-content">
            <div className="login-header">
              <h1 className="login-title">Login</h1>
            </div>
            <div className="login-body">
              <form onSubmit={handleSubmit} className="login-form">
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  required
                />
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                  required
                />
                <Button type="submit" disabled={!isFormValid || loading}>
                  Login
                </Button>
              </form>
              <p className="login-register-link">
                Don't have an account?{" "}
                <Link to="/register" className="login-link">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
}

export default Login;

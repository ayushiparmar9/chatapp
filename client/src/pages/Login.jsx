import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../config/Api";
import { useGoogleAuth } from "../config/GoogleAuth";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();
const {isLoading, error, isInitialized, signInWithGoogle } = useGoogleAuth();

  const handleGoogleSuccess = async (userData) => {
    console.log("Google Login Data", userData);
  };

  const GoogleLogin = () => {
    signInWithGoogle(handleGoogleSuccess, handleGoogleFailure);
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login failed:", error);
    toast.error("Google login failed. Please try again.");
  };




  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [Loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setFormData({
      email: "",
      password: "",
    });
    setValidationError({});
  };

  const validate = () => {
    let Error = {};

    if (
      !/^[\w.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co.in)$/.test(
        formData.email
      )
    ) {
      Error.email = "Use proper email format";
    }

    if (!formData.password) {
      Error.password = "Password is required";
    }

    setValidationError(Error);
    return Object.keys(Error).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validate()) {
      setLoading(false);
      toast.error("Fill the form correctly");
      return;
    }

    try {
      const res = await api.post("/auth/login", formData);

      toast.success(res.data.message || "Welcome to ChatKaro 💬");

      sessionStorage.setItem(
        "chatkaro_user",
        JSON.stringify(res.data.data)
      );

      navigate("/chatting");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">

            {/* Header */}
            <h2 className="card-title text-3xl justify-center text-primary">
              Login
            </h2>
            <p className="text-center text-base-content/70 mb-6">
              Welcome back to ChatKaro 💬
            </p>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              onReset={handleClearForm}
              className="space-y-4"
            >
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="input input-bordered w-full"
                />
                {validationError.email && (
                  <p className="text-error text-sm mt-1">
                    {validationError.email}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="input input-bordered w-full"
                />
                {validationError.password && (
                  <p className="text-error text-sm mt-1">
                    {validationError.password}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-6">
                <button
                  type="reset"
                  disabled={Loading}
                  className="btn btn-secondary btn-outline flex-1"
                >
                  Clear
                </button>

                <button
                  type="submit"
                  disabled={Loading}
                  className="btn btn-primary flex-1"
                >
                  {Loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
<div className="mt-4">
              {error ? (
                <button
                  className="btn btn-outline btn-error font-sans flex items-center justify-center gap-2 w-full"
                  disabled
                >
                  <FcGoogle className="text-xl" />
                  {error}
                </button>
              ) : (
                <button
                  onClick={GoogleLogin}
                  className="btn btn-outline font-sans flex items-center justify-center gap-2 w-full"
                  disabled={!isInitialized || isLoading}
                >
                  <FcGoogle className="text-xl" />
                  {isLoading
                    ? "Loading..."
                    : isInitialized
                      ? "Continue with Google"
                      : "Google Auth Error"}
                </button>
              )}
            </div>







          </div>
        </div>

        <p className="text-center text-sm text-base-content/60 mt-6">
          Secure login 🔐
        </p>
      </div>
    </div>
  );
};

export default Login;

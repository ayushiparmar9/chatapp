import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, isLogin } = useAuth();
  const [theme, setTheme] = useState("");
   const navigate = useNavigate();

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
    localStorage.setItem("chatKaroTheme", event.target.value);
    document.documentElement.setAttribute("data-theme", event.target.value);
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem("chatKaroTheme");
    document.documentElement.setAttribute("data-theme", currentTheme);
    setTheme(currentTheme);
  }, []);

  return (
    <>
      <div className="bg-primary flex justify-between px-5 py-2">
        <h1>ChatKaro</h1>
        <div>
          <span>Home</span>
          <span>About</span>
          <Link to="/chatting"> Chat </Link>
        </div>

        <div className="flex gap-3">
           {isLogin ? (
            <div
              className="flex items-center gap-3 cursor-pointer p-1 border border-primary hover:border-primary-content rounded-md transition"
              onClick={() => navigate("/userDashboard")}
            >
              <span className="text-nowrap text-lg font-semibold">
                Welcome,{" "}
                {user?.fullName.split(" ")[0] || user?.email.split("@")[0]}
              </span>
            </div>
          ) : (
            <>
              <button
                className="btn-secondary1"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

              <button
                className="btn btn-outline btn-sm px-5"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          )}
          <select
            name="theme"
            id="theme"
             className="select select-bordered select-sm max-w-32"
            onChange={handleThemeChange}
            value={theme}
          >
            <option value="">Default</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="claude">Claude</option>
            <option value="spotify">Spotify</option>
            <option value="vscode">VSCode</option>
            <option value="black">Black</option>
            <option value="corporate">Corporate</option>
            <option value="ghibli">Ghibli</option>
            <option value="gourmet">Gourmet</option>
            <option value="luxury">Luxury</option>
            <option value="mintlify">Mintlify</option>
            <option value="pastel">Pastel</option>
            <option value="perplexity">Perplexity</option>
            <option value="shadcn">Shadcn</option>
            <option value="slack">Slack</option>
            <option value="soft">Soft</option>
            <option value="valorant">Valorant</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Navbar;
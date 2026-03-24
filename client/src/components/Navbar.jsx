import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 px-6 py-4 flex items-center justify-between">
      <span className="text-white text-xl font-bold tracking-tight">Taska</span>
      <div className="flex items-center gap-4">
        <span className="text-emerald-50 text-sm">Hey, {user?.name}</span>
        <ThemeToggle />
        <button
          onClick={handleLogout}
          className="text-white border border-white/40 px-4 py-1.5 rounded-md text-sm hover:bg-white/10 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

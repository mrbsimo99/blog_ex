import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../services/auth";
import { useState, useEffect } from "react";

function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setUser(getUser());
    }, []);

    const handleLogout = () => {
        logout();
        setUser(null);
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">Blog</Link>

            <div>
                {user ? (
                    <div className="flex items-center gap-4">
                        <span className="text-gray-700">
                          {user.firstName} {user.lastName}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;

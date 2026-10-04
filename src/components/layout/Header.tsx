import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function Header() {
    const { user, logout } = useAuth();
    const location = useLocation();

    const linkClass = (path: string) =>
        `underline cursor-pointer ${location.pathname === path ? "font-semibold text-slate-900" : ""
        }`;

    return (
        <header className="bg-white border-b px-4 py-3 flex justify-between items-center">
            <div className="font-semibold text-slate-800">Credit Copilot Lite</div>
            <div className="flex items-center gap-4 text-sm text-slate-600">
                <Link to="/ask" className={linkClass("/ask")}>
                    Ask
                </Link>
                <Link to="/assess" className={linkClass("/assess")}>
                    Assess
                </Link>
                <span>
                    {user?.username} ({user?.role})
                </span>
                <button
                    type="button"
                    onClick={logout}
                    className="underline cursor-pointer"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}

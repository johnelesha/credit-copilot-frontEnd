import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/useAuth";
import LoginPage from "./pages/LoginPage";
import AssessPage from "./pages/AssessPage";
import AskPage from "./pages/AskPage";

function Protected({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

/* function Placeholder({ title }: { title: string }) {
  const { user, logout } = useAuth();
  return (
    <>
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">{title}</h1>
            <div className="text-sm text-slate-600">
              {user?.username} ({user?.role}){" "}
              <button
                onClick={logout}
                className="underline ml-2 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
          <p className="text-slate-500">Page coming next…</p>
        </div>
      </div>
    </>
  );
} */

export default function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/assess"
            element={
              <Protected>
                <AssessPage />
              </Protected>
            }
          />
          <Route
            path="/ask"
            element={
              <Protected>
                <AskPage />
              </Protected>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

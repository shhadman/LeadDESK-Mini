import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

function ProtectedRoute({ children }) {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return <div className="p-8 text-center">Loading...</div>;
  }

 if (!session) {
  return <Navigate to="/login" replace />;
}

if (session.user.email !== "admin@gmail.com") {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Access Denied
        </h1>

        <p className="mb-6">
          You are not authorized to access the Admin Dashboard.
        </p>

        <button
          onClick={() => {
            supabase.auth.signOut();
            window.location.href = "/";
          }}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
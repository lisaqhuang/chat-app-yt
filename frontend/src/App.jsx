import "./App.css";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";


function App() {
  const { authUser } = useAuthContext();

  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <Routes>
          <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
          <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        </Routes>
        <Toaster />

        {/* <Home />
        <SignUp />*/}
      </div>

    </>
  )
}

export default App

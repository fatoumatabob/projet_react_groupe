import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Friends from "./pages/Friends";
import Articles from "./pages/Articles";
import ArticleForm from "./pages/ArticleForm";
import Comments from "./pages/Comments";
import ProtectedRoute from "./components/ProtectedRoute";
import ArticleDetails from './components/ArticleDetails';
import VerifyOtp from "./pages/VerifyOtp";
import ArticleEdit from "./pages/ArticleEdit";
export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/articles/:id" element={<ArticleDetails />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/articles/:id/edit" element={<ArticleEdit />} />

          {/* Routes protégées */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/new" element={<ArticleForm />} />
            <Route path="/articles/:id/comments" element={<Comments />} />
            
          </Route>
        </Routes>
      </div>
    </div>
  );
}

import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import EditBlog from "./pages/EditBlog";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Bookmarks from "./pages/Bookmarks";

function App() {
  return (
    <Routes>

      {/* Pages with Navbar/Footer */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/create-blog"
  element={
    <ProtectedRoute>
      <CreateBlog />
    </ProtectedRoute>
  }
/>

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
      <Route
        path="/blog/:id"
        element={
          <MainLayout>
            <BlogDetails />
          </MainLayout>
        }
      />

      <Route
        path="/edit/:id"
        element={
          <MainLayout>
            <EditBlog />
          </MainLayout>
        }
      />

      {/* Pages without Navbar/Footer */}
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      <Route path="/bookmarks" element={<Bookmarks />} />

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;
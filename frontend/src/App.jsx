import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LeaveHistory from "./pages/LeaveHistory";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import LeaveRequests from "./pages/LeaveRequests";
import NewRequest from "./pages/NewRequest";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />        
        
        <Route path="/leave-history"
         element={
         <ProtectedRoute>
         <LeaveHistory />
         </ProtectedRoute>
         } />
        <Route path="/profile"
         element={
          <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
         } />
       <Route
  path="/admin-dashboard"
  element={
    <ProtectedRoute>
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    </ProtectedRoute>
  }
/>
        <Route
  path="/add-employee"
  element={
    <ProtectedRoute>
      <AdminRoute>
        <AddEmployee />
      </AdminRoute>
    </ProtectedRoute>
  }
/>
        <Route
  path="/leave-requests"
  element={
    <ProtectedRoute>
      <AdminRoute>
        <LeaveRequests />
      </AdminRoute>
    </ProtectedRoute>
  }
/>
       
<Route
  path="/edit-employee/:id"
  element={
    <ProtectedRoute>
      <AdminRoute>
        <AddEmployee />
      </AdminRoute>
    </ProtectedRoute>
  }
/>
        <Route path="/new-request"
         element={
          <ProtectedRoute>
         <NewRequest />
         </ProtectedRoute>
        } />
        <Route
  path="/employees"
  element={
    <ProtectedRoute>
      <AdminRoute>
        <Employees />
      </AdminRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/change-password"
  element={
    <ProtectedRoute>
      <ChangePassword />
    </ProtectedRoute>
  }
/>
      
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
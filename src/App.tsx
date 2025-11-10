import { BrowserRouter, Route, Routes } from "react-router";
import PageNotFound from "./ui/Error";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import Homepage from "./ui/HomePage";
import Dashboard from "./features/dashboard/Dashboard";
import Companies from "./features/companies/Companies";
import Company from "./features/companies/Company";
import Profile from "./features/profile/Profile";
import Forbidden from "./ui/Forbidden";
import Signin from "./features/auth/Signin";
import Signup from "./features/auth/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />

        <Route element={<AppLayout />}>
          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:id" element={<Company />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/dashboard/admin" element={<Dashboard />} />
            <Route path="/companies/admin" element={<Companies />} />
            <Route path="/companies/admin/:id" element={<Company />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["superadmin"]} />}>
            <Route path="/dashboard/superadmin" element={<Dashboard />} />
            <Route path="/companies/superadmin" element={<Companies />} />
            <Route path="/companies/superadmin/:id" element={<Company />} />
          </Route>

          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

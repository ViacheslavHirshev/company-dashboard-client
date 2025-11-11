import { BrowserRouter, Route, Routes } from "react-router";
import PageNotFound from "./ui/Error";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import Dashboard from "./features/dashboard/Dashboard";
import Companies from "./features/companies/Companies";
import Company from "./features/companies/Company";
import Profile from "./features/profile/Profile";
import Forbidden from "./ui/Forbidden";
import Homepage from "./ui/Homepage";
import SignInForm from "./features/auth/SignInForm";
import SignUpForm from "./features/auth/SignUpForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />

        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:id" element={<Company />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route element={<AppLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/companies" element={<Companies />} />
            <Route path="/admin/companies/:id" element={<Company />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["superadmin"]} />}>
          <Route element={<AppLayout />}>
            <Route path="/superadmin/dashboard" element={<Dashboard />} />
            <Route path="/superadmin/companies" element={<Companies />} />
            <Route path="/superadmin/companies/:id" element={<Company />} />
          </Route>
        </Route>

        <Route
          element={
            <ProtectedRoute allowedRoles={["user", "admin", "superadmin"]} />
          }
        >
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

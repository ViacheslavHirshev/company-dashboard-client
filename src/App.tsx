import { BrowserRouter, Route, Routes } from "react-router";
import PageNotFound from "./ui/Error";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import Dashboard from "./features/dashboard/Dashboard";
import Companies from "./features/companies/Companies";
import Company from "./features/companies/Company";
import ProfilePage from "./features/profile/ProfilePage";
import Forbidden from "./ui/Forbidden";
import Homepage from "./ui/Homepage";
import SignInForm from "./features/auth/SignInForm";
import SignUpForm from "./features/auth/SignUpForm";
import RoleProvider from "./context/RoleProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RoleProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />

            <Route
              element={
                <ProtectedRoute
                  allowedRoles={["user", "admin", "superadmin"]}
                />
              }
            >
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/companies/:id" element={<Company />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Route>

            <Route path="/forbidden" element={<Forbidden />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </RoleProvider>
    </QueryClientProvider>
  );
}

export default App;

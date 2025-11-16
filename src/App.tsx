import { BrowserRouter, Route, Routes } from "react-router";
import NotFound from "./ui/NotFound";
import ProtectedRoute from "./ui/ProtectedRoute";
import DashboardPage from "./features/dashboard/DashboardPage";
import Homepage from "./ui/Homepage";
import RoleProvider from "./context/RoleProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppLayout from "./ui/layout/AppLayout";
import { ProfilePage } from "./features/profile/ProfilePage";
import { CompanyInfo } from "./features/companies/companyInfo/CompanyInfo";
import UserInfo from "./features/dashboard/UserInfo";
import { Companies } from "./features/companies/Companies";
import ChangePassword from "./features/profile/ChangePassword";
import SignIn from "./features/auth/SignIn";
import Reset from "./features/auth/Reset";
import SignUp from "./features/auth/SignUp";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RoleProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/reset-password" element={<Reset />} />

            <Route
              element={
                <ProtectedRoute
                  allowedRoles={["user", "admin", "superadmin"]}
                />
              }
            >
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/companies/:id" element={<CompanyInfo />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route
                  path="/profile/password-change"
                  element={<ChangePassword />}
                />
                <Route path="/users/:id" element={<UserInfo />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </RoleProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

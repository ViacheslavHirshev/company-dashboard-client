import { BrowserRouter, Route, Routes } from "react-router";
import NotFoundPage from "./ui/NotFoundPage";
import ProtectedRoute from "./ui/ProtectedRoute";
import DashboardPage from "./features/dashboard/DashboardPage";
import { CompaniesPage } from "./features/companies/CompaniesPage";
import CompanyInfo from "./features/companies/companyInfo/CompanyInfo";
import ProfilePage from "./features/profile/ProfilePage";
import Homepage from "./ui/Homepage";
import SignInForm from "./features/auth/SignInForm";
import SignUpForm from "./features/auth/SignUpForm";
import RoleProvider from "./context/RoleProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppLayout from "./ui/layout/AppLayout";

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
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/companies" element={<CompaniesPage />} />
                <Route path="/companies/:id" element={<CompanyInfo />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </RoleProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

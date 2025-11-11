import { useContext, useEffect, useState } from "react";
import { getUserData } from "../api/services/userService";
import Loader from "../ui/Loader";
import { createContext, Dispatch, SetStateAction } from "react";

type TRoleContext = {
  role: string | null;
  setRole: Dispatch<SetStateAction<string | null>>;
};

const RoleContext = createContext<TRoleContext | null>(null);

function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function setUserRole() {
      try {
        setIsLoading(true);
        const { user } = await getUserData();
        setRole(user.role);
      } catch (error) {
        setRole(null);
      } finally {
        setIsLoading(false);
      }
    }

    setUserRole();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export default RoleProvider;

export const useRoleContext = () => {
  const context = useContext(RoleContext);

  if (context === null)
    throw new Error("Role context must be within a RoleProvider");

  return context;
};

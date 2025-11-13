import { useNavigate } from "react-router";
import { useRoleContext } from "../../context/RoleProvider";
import { useLocalStorage } from "../../hooks/localStorage";
import Button from "../../ui/buttons/Button";

export default function LogoutBtn() {
  const { clearLocal } = useLocalStorage();
  const { setRole } = useRoleContext();
  const navigate = useNavigate();

  function logout() {
    clearLocal();
    navigate("/");
    setTimeout(() => setRole(null), 1);
  }
  return <Button onClickHandler={logout}>Logout</Button>;
}

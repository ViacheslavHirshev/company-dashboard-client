import { useNavigate } from "react-router";
import { useRoleContext } from "../../../context/RoleProvider";
import { useLocalStorage } from "../../../hooks/localStorage";
import Button from "../../../ui/buttons/Button";
import toast from "react-hot-toast";

export default function LogoutBtn() {
  const { clearLocal } = useLocalStorage();
  const { setRole } = useRoleContext();
  const navigate = useNavigate();

  function logout() {
    clearLocal();
    navigate("/");
    setTimeout(() => setRole(null), 1);
    setTimeout(() => toast.success("You successfully logout"), 2);
  }
  return (
    <Button style="danger" onClickHandler={logout}>
      Logout
    </Button>
  );
}

import { useNavigate } from "react-router-dom";
import "./dropdownMenu.scss";

const DropdownMenu = ({ isOpen, toggleMenu }) => {
  const navigate = useNavigate();

  const menuItems = [
    { path: "/menu", label: "Meny" },
    { path: "/order", label: "Orderstatus" },
    { path: "/receipt", label: "Kvitto" },
  ];

  if (!isOpen) return null;

  return (
    <div className="dropdownMenu">
      {menuItems.map(({ path, label }) => (
        <button key={path} onClick={() => { navigate(path); toggleMenu(); }}>
          {label}
        </button>
      ))}
    </div>
  );
};

export default DropdownMenu;

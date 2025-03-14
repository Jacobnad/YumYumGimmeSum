import { useNavigate } from "react-router-dom";
import "./startPage.scss";
import logo from "../../assets/logo.png";

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="startPage" onClick={() => navigate("/menu")}>
      <img src={logo} alt="Yum Yum Logo" className="logo" />
    </div>
  );
};

export default StartPage;

